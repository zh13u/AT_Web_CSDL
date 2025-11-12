import { Response } from "express";
import { AppDataSource } from "../data-source";
import { Cart } from "../entities/Cart";
import { CartItem } from "../entities/CartItem";
import { Product } from "../entities/Product";
import { AuthRequest } from "../middlewares/auth.middleware";

export class CartController {
  private cartRepository = AppDataSource.getRepository(Cart);
  private cartItemRepository = AppDataSource.getRepository(CartItem);
  private productRepository = AppDataSource.getRepository(Product);

  // GET /api/cart - Lấy giỏ hàng
  async getCart(req: AuthRequest, res: Response) {
    try {
      const userId = req.userId!;

      // Tìm hoặc tạo cart
      let cart = await this.cartRepository.findOne({
        where: { userId },
        relations: ["items", "items.product"],
      });

      if (!cart) {
        cart = this.cartRepository.create({
          userId,
          totalPrice: 0,
        });
        cart = await this.cartRepository.save(cart);
      }

      res.json({
        success: true,
        data: cart,
      });
    } catch (error) {
      console.error("Error getting cart:", error);
      res.status(500).json({
        success: false,
        message: "Lỗi khi lấy giỏ hàng",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  // POST /api/cart/items - Thêm sản phẩm vào giỏ
  async addItem(req: AuthRequest, res: Response) {
    try {
      const userId = req.userId!;
      const { productId, quantity } = req.body;

      if (!productId || !quantity) {
        return res.status(400).json({
          success: false,
          message: "Thiếu productId hoặc quantity",
        });
      }

      // Tìm hoặc tạo cart
      let cart = await this.cartRepository.findOne({
        where: { userId },
        relations: ["items"],
      });

      if (!cart) {
        cart = this.cartRepository.create({
          userId,
          totalPrice: 0,
        });
        cart = await this.cartRepository.save(cart);
      }

      // Kiểm tra sản phẩm
      const product = await this.productRepository.findOne({
        where: { productId: parseInt(productId) },
      });

      if (!product || !product.isActive) {
        return res.status(404).json({
          success: false,
          message: "Sản phẩm không tồn tại hoặc đã ngừng bán",
        });
      }

      // Kiểm tra số lượng tồn kho
      if (product.stock < quantity) {
        return res.status(400).json({
          success: false,
          message: "Số lượng sản phẩm không đủ",
        });
      }

      // Kiểm tra item đã có trong giỏ chưa
      let cartItem = await this.cartItemRepository.findOne({
        where: {
          cartId: cart.cartId,
          productId: parseInt(productId),
        },
      });

      if (cartItem) {
        // Cập nhật số lượng
        cartItem.quantity += parseInt(quantity);
        cartItem.subtotal = cartItem.quantity * product.price;
      } else {
        // Tạo item mới
        cartItem = this.cartItemRepository.create({
          cartId: cart.cartId,
          productId: parseInt(productId),
          quantity: parseInt(quantity),
          subtotal: parseInt(quantity) * product.price,
        });
      }

      await this.cartItemRepository.save(cartItem);

      // Cập nhật totalPrice của cart
      await this.updateCartTotal(cart.cartId);

      res.json({
        success: true,
        message: "Thêm sản phẩm vào giỏ thành công",
        data: cartItem,
      });
    } catch (error) {
      console.error("Error adding item to cart:", error);
      res.status(500).json({
        success: false,
        message: "Lỗi khi thêm sản phẩm vào giỏ",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  // PUT /api/cart/items/:itemId - Cập nhật số lượng
  async updateItem(req: AuthRequest, res: Response) {
    try {
      const userId = req.userId!;
      const { itemId } = req.params;
      const { quantity } = req.body;

      if (!quantity || quantity < 1) {
        return res.status(400).json({
          success: false,
          message: "Số lượng phải lớn hơn 0",
        });
      }

      // Tìm cart của user
      const cart = await this.cartRepository.findOne({
        where: { userId },
      });

      if (!cart) {
        return res.status(404).json({
          success: false,
          message: "Không tìm thấy giỏ hàng",
        });
      }

      // Tìm item
      const cartItem = await this.cartItemRepository.findOne({
        where: {
          cartItemId: parseInt(itemId),
          cartId: cart.cartId,
        },
        relations: ["product"],
      });

      if (!cartItem) {
        return res.status(404).json({
          success: false,
          message: "Không tìm thấy sản phẩm trong giỏ",
        });
      }

      // Kiểm tra số lượng tồn kho
      if (cartItem.product.stock < quantity) {
        return res.status(400).json({
          success: false,
          message: "Số lượng sản phẩm không đủ",
        });
      }

      // Cập nhật
      cartItem.quantity = parseInt(quantity);
      cartItem.subtotal = cartItem.quantity * cartItem.product.price;
      await this.cartItemRepository.save(cartItem);

      // Cập nhật totalPrice
      await this.updateCartTotal(cart.cartId);

      res.json({
        success: true,
        message: "Cập nhật số lượng thành công",
        data: cartItem,
      });
    } catch (error) {
      console.error("Error updating cart item:", error);
      res.status(500).json({
        success: false,
        message: "Lỗi khi cập nhật số lượng",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  // DELETE /api/cart/items/:itemId - Xóa sản phẩm khỏi giỏ
  async removeItem(req: AuthRequest, res: Response) {
    try {
      const userId = req.userId!;
      const { itemId } = req.params;

      // Tìm cart của user
      const cart = await this.cartRepository.findOne({
        where: { userId },
      });

      if (!cart) {
        return res.status(404).json({
          success: false,
          message: "Không tìm thấy giỏ hàng",
        });
      }

      // Xóa item
      await this.cartItemRepository.delete({
        cartItemId: parseInt(itemId),
        cartId: cart.cartId,
      });

      // Cập nhật totalPrice
      await this.updateCartTotal(cart.cartId);

      res.json({
        success: true,
        message: "Xóa sản phẩm khỏi giỏ thành công",
      });
    } catch (error) {
      console.error("Error removing cart item:", error);
      res.status(500).json({
        success: false,
        message: "Lỗi khi xóa sản phẩm",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  // DELETE /api/cart - Xóa toàn bộ giỏ hàng
  async clearCart(req: AuthRequest, res: Response) {
    try {
      const userId = req.userId!;

      const cart = await this.cartRepository.findOne({
        where: { userId },
      });

      if (cart) {
        // Xóa tất cả items
        await this.cartItemRepository.delete({ cartId: cart.cartId });
        
        // Reset totalPrice
        cart.totalPrice = 0;
        await this.cartRepository.save(cart);
      }

      res.json({
        success: true,
        message: "Xóa giỏ hàng thành công",
      });
    } catch (error) {
      console.error("Error clearing cart:", error);
      res.status(500).json({
        success: false,
        message: "Lỗi khi xóa giỏ hàng",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  // Helper: Cập nhật totalPrice của cart
  private async updateCartTotal(cartId: number) {
    const items = await this.cartItemRepository.find({
      where: { cartId },
    });

    const totalPrice = items.reduce((sum, item) => sum + parseFloat(item.subtotal.toString()), 0);

    await this.cartRepository.update(cartId, { totalPrice });
  }
}

