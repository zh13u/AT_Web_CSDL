import { Response } from "express";
import { AppDataSource } from "../data-source";
import { Order } from "../entities/Order";
import { OrderItem } from "../entities/OrderItem";
import { Cart } from "../entities/Cart";
import { CartItem } from "../entities/CartItem";
import { Product } from "../entities/Product";
import { Payment } from "../entities/Payment";
import { Voucher } from "../entities/Voucher";
import { AuthRequest } from "../middlewares/auth.middleware";

export class OrdersController {
  private orderRepository = AppDataSource.getRepository(Order);
  private orderItemRepository = AppDataSource.getRepository(OrderItem);
  private cartRepository = AppDataSource.getRepository(Cart);
  private cartItemRepository = AppDataSource.getRepository(CartItem);
  private productRepository = AppDataSource.getRepository(Product);
  private paymentRepository = AppDataSource.getRepository(Payment);
  private voucherRepository = AppDataSource.getRepository(Voucher);

  // GET /api/orders - Lấy danh sách đơn hàng
  async getOrders(req: AuthRequest, res: Response) {
    try {
      const userId = req.userId!;

      const orders = await this.orderRepository.find({
        where: { userId },
        relations: ["items", "items.product", "payment", "voucher"],
        order: { orderDate: "DESC" },
      });

      res.json({
        success: true,
        data: orders,
      });
    } catch (error) {
      console.error("Error getting orders:", error);
      res.status(500).json({
        success: false,
        message: "Lỗi khi lấy danh sách đơn hàng",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  // GET /api/orders/:id - Lấy chi tiết đơn hàng
  async getOrderById(req: AuthRequest, res: Response) {
    try {
      const userId = req.userId!;
      const { id } = req.params;

      const order = await this.orderRepository.findOne({
        where: { orderId: parseInt(id), userId },
        relations: ["items", "items.product", "payment", "shipping", "voucher"],
      });

      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Không tìm thấy đơn hàng",
        });
      }

      res.json({
        success: true,
        data: order,
      });
    } catch (error) {
      console.error("Error getting order:", error);
      res.status(500).json({
        success: false,
        message: "Lỗi khi lấy thông tin đơn hàng",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  // POST /api/orders - Tạo đơn hàng mới
  async createOrder(req: AuthRequest, res: Response) {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const userId = req.userId!;
      const { shippingAddress, paymentMethod, voucherCode } = req.body;

      if (!shippingAddress || !paymentMethod) {
        return res.status(400).json({
          success: false,
          message: "Thiếu shippingAddress hoặc paymentMethod",
        });
      }

      // Lấy cart của user
      const cart = await this.cartRepository.findOne({
        where: { userId },
        relations: ["items", "items.product"],
      });

      if (!cart || cart.items.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Giỏ hàng trống",
        });
      }

      // Kiểm tra tồn kho và tính tổng tiền
      let totalAmount = 0;
      for (const item of cart.items) {
        if (item.product.stock < item.quantity) {
          await queryRunner.rollbackTransaction();
          return res.status(400).json({
            success: false,
            message: `Sản phẩm ${item.product.name} không đủ số lượng`,
          });
        }
        totalAmount += parseFloat(item.subtotal.toString());
      }

      // Kiểm tra voucher (nếu có)
      let discountAmount = 0;
      let voucher = null;
      if (voucherCode) {
        voucher = await this.voucherRepository.findOne({
          where: { code: voucherCode, isActive: true },
        });

        if (voucher) {
          if (new Date() > voucher.expiryDate) {
            await queryRunner.rollbackTransaction();
            return res.status(400).json({
              success: false,
              message: "Voucher đã hết hạn",
            });
          }

          if (voucher.usageLimit > 0 && voucher.usedCount >= voucher.usageLimit) {
            await queryRunner.rollbackTransaction();
            return res.status(400).json({
              success: false,
              message: "Voucher đã hết lượt sử dụng",
            });
          }

          if (totalAmount < voucher.minOrderAmount) {
            await queryRunner.rollbackTransaction();
            return res.status(400).json({
              success: false,
              message: `Đơn hàng tối thiểu ${voucher.minOrderAmount} để sử dụng voucher`,
            });
          }

          // Tính discount
          if (voucher.discountAmount > 0) {
            discountAmount = parseFloat(voucher.discountAmount.toString());
          } else if (voucher.discountPercent > 0) {
            discountAmount = totalAmount * (parseFloat(voucher.discountPercent.toString()) / 100);
          }
        }
      }

      const finalAmount = totalAmount - discountAmount;

      // Tạo order
      const order = this.orderRepository.create({
        userId,
        status: "pending",
        totalAmount: finalAmount,
        paymentMethod,
        shippingAddress,
        discountAmount,
        voucherId: voucher?.voucherId,
      });

      const savedOrder = await queryRunner.manager.save(Order, order);

      // Tạo order items và giảm stock
      for (const cartItem of cart.items) {
        const orderItem = this.orderItemRepository.create({
          orderId: savedOrder.orderId,
          productId: cartItem.productId,
          quantity: cartItem.quantity,
          price: cartItem.product.price,
          subtotal: parseFloat(cartItem.subtotal.toString()),
        });
        await queryRunner.manager.save(OrderItem, orderItem);

        // Giảm stock
        cartItem.product.stock -= cartItem.quantity;
        await queryRunner.manager.save(Product, cartItem.product);
      }

      // Tạo payment
      const payment = this.paymentRepository.create({
        orderId: savedOrder.orderId,
        amount: finalAmount,
        method: paymentMethod,
        status: "pending",
      });
      await queryRunner.manager.save(Payment, payment);

      // Cập nhật voucher (nếu có)
      if (voucher) {
        voucher.usedCount += 1;
        await queryRunner.manager.save(Voucher, voucher);
      }

      // Xóa cart
      await queryRunner.manager.delete(CartItem, { cartId: cart.cartId });
      cart.totalPrice = 0;
      await queryRunner.manager.save(Cart, cart);

      await queryRunner.commitTransaction();

      // Lấy order với relations
      const orderWithRelations = await this.orderRepository.findOne({
        where: { orderId: savedOrder.orderId },
        relations: ["items", "items.product", "payment"],
      });

      res.status(201).json({
        success: true,
        message: "Tạo đơn hàng thành công",
        data: orderWithRelations,
      });
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error("Error creating order:", error);
      res.status(500).json({
        success: false,
        message: "Lỗi khi tạo đơn hàng",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    } finally {
      await queryRunner.release();
    }
  }

  // PUT /api/orders/:id/status - Cập nhật trạng thái
  async updateStatus(req: AuthRequest, res: Response) {
    try {
      const userId = req.userId!;
      const { id } = req.params;
      const { status } = req.body;

      const validStatuses = ["pending", "processing", "shipped", "delivered", "cancelled"];
      if (!status || !validStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Trạng thái không hợp lệ",
        });
      }

      const order = await this.orderRepository.findOne({
        where: { orderId: parseInt(id), userId },
      });

      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Không tìm thấy đơn hàng",
        });
      }

      order.status = status as any;
      if (status === "delivered") {
        order.deliveryDate = new Date();
      }

      await this.orderRepository.save(order);

      res.json({
        success: true,
        message: "Cập nhật trạng thái thành công",
        data: order,
      });
    } catch (error) {
      console.error("Error updating order status:", error);
      res.status(500).json({
        success: false,
        message: "Lỗi khi cập nhật trạng thái",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
}

