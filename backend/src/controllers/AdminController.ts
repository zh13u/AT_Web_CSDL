import { Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import { Order } from "../entities/Order";
import { Product } from "../entities/Product";
import { AuthRequest } from "../middlewares/auth.middleware";

export class AdminController {
  private userRepository = AppDataSource.getRepository(User);
  private orderRepository = AppDataSource.getRepository(Order);
  private productRepository = AppDataSource.getRepository(Product);

  // GET /api/admin/users - Lấy danh sách users
  async getUsers(req: AuthRequest, res: Response) {
    try {
      const { page = "1", limit = "10", role, search } = req.query;

      const pageNum = parseInt(page as string);
      const limitNum = parseInt(limit as string);
      const skip = (pageNum - 1) * limitNum;

      const queryBuilder = this.userRepository.createQueryBuilder("user");

      if (role) {
        queryBuilder.where("user.role = :role", { role });
      }

      if (search) {
        queryBuilder.andWhere(
          "(user.name LIKE :search OR user.email LIKE :search)",
          { search: `%${search}%` }
        );
      }

      const [users, total] = await queryBuilder
        .select(["user.userId", "user.name", "user.email", "user.role", "user.dateRegistered", "user.lastLogin"])
        .skip(skip)
        .take(limitNum)
        .orderBy("user.dateRegistered", "DESC")
        .getManyAndCount();

      res.json({
        success: true,
        data: users,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          totalPages: Math.ceil(total / limitNum),
        },
      });
    } catch (error) {
      console.error("Error getting users:", error);
      res.status(500).json({
        success: false,
        message: "Lỗi khi lấy danh sách users",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  // GET /api/admin/users/:id - Lấy chi tiết user
  async getUserById(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;

      const user = await this.userRepository.findOne({
        where: { userId: parseInt(id) },
        select: ["userId", "name", "email", "phone", "address", "role", "dateRegistered", "lastLogin"],
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Không tìm thấy user",
        });
      }

      res.json({
        success: true,
        data: user,
      });
    } catch (error) {
      console.error("Error getting user:", error);
      res.status(500).json({
        success: false,
        message: "Lỗi khi lấy thông tin user",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  // PUT /api/admin/users/:id - Cập nhật user
  async updateUser(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const user = await this.userRepository.findOne({
        where: { userId: parseInt(id) },
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Không tìm thấy user",
        });
      }

      // Không cho phép update password ở đây
      delete updateData.password;

      Object.assign(user, updateData);
      const updatedUser = await this.userRepository.save(user);

      res.json({
        success: true,
        message: "Cập nhật user thành công",
        data: updatedUser,
      });
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({
        success: false,
        message: "Lỗi khi cập nhật user",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  // GET /api/admin/orders - Lấy danh sách orders
  async getOrders(req: AuthRequest, res: Response) {
    try {
      const { page = "1", limit = "10", status } = req.query;

      const pageNum = parseInt(page as string);
      const limitNum = parseInt(limit as string);
      const skip = (pageNum - 1) * limitNum;

      const queryBuilder = this.orderRepository
        .createQueryBuilder("order")
        .leftJoinAndSelect("order.user", "user")
        .leftJoinAndSelect("order.items", "items")
        .leftJoinAndSelect("items.product", "product");

      if (status) {
        queryBuilder.where("order.status = :status", { status });
      }

      const [orders, total] = await queryBuilder
        .skip(skip)
        .take(limitNum)
        .orderBy("order.orderDate", "DESC")
        .getManyAndCount();

      res.json({
        success: true,
        data: orders,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          totalPages: Math.ceil(total / limitNum),
        },
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

  // GET /api/admin/orders/:id - Lấy chi tiết order
  async getOrderById(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;

      const order = await this.orderRepository.findOne({
        where: { orderId: parseInt(id) },
        relations: ["user", "items", "items.product", "payment", "shipping", "voucher"],
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

  // PUT /api/admin/orders/:id/status - Cập nhật trạng thái order
  async updateOrderStatus(req: AuthRequest, res: Response) {
    try {
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
        where: { orderId: parseInt(id) },
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

      order.processedByAdminId = req.userId!;
      await this.orderRepository.save(order);

      res.json({
        success: true,
        message: "Cập nhật trạng thái đơn hàng thành công",
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

  // GET /api/admin/products - Lấy tất cả products (kể cả inactive)
  async getAllProducts(req: AuthRequest, res: Response) {
    try {
      const products = await this.productRepository.find({
        relations: ["category"],
        order: { dateAdded: "DESC" },
      });

      res.json({
        success: true,
        data: products,
      });
    } catch (error) {
      console.error("Error getting products:", error);
      res.status(500).json({
        success: false,
        message: "Lỗi khi lấy danh sách sản phẩm",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  // POST /api/admin/products - Tạo product
  async createProduct(req: AuthRequest, res: Response) {
    try {
      const {
        name,
        description,
        price,
        stock,
        categoryId,
        brand,
        imageUrl,
      } = req.body;

      if (!name || !price || !categoryId || !brand) {
        return res.status(400).json({
          success: false,
          message: "Thiếu thông tin bắt buộc",
        });
      }

      const product = this.productRepository.create({
        name,
        description,
        price: parseFloat(price),
        stock: parseInt(stock) || 0,
        categoryId: parseInt(categoryId),
        brand,
        imageUrl,
        managedByAdminId: req.userId!,
      });

      const savedProduct = await this.productRepository.save(product);

      res.status(201).json({
        success: true,
        message: "Tạo sản phẩm thành công",
        data: savedProduct,
      });
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({
        success: false,
        message: "Lỗi khi tạo sản phẩm",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  // PUT /api/admin/products/:id - Cập nhật product
  async updateProduct(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const product = await this.productRepository.findOne({
        where: { productId: parseInt(id) },
      });

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Không tìm thấy sản phẩm",
        });
      }

      Object.assign(product, updateData);
      const updatedProduct = await this.productRepository.save(product);

      res.json({
        success: true,
        message: "Cập nhật sản phẩm thành công",
        data: updatedProduct,
      });
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).json({
        success: false,
        message: "Lỗi khi cập nhật sản phẩm",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  // DELETE /api/admin/products/:id - Xóa product (hard delete)
  async deleteProduct(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;

      const product = await this.productRepository.findOne({
        where: { productId: parseInt(id) },
      });

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Không tìm thấy sản phẩm",
        });
      }

      await this.productRepository.remove(product);

      res.json({
        success: true,
        message: "Xóa sản phẩm thành công",
      });
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({
        success: false,
        message: "Lỗi khi xóa sản phẩm",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  // GET /api/admin/stats - Thống kê
  async getStats(req: AuthRequest, res: Response) {
    try {
      const totalUsers = await this.userRepository.count();
      const totalProducts = await this.productRepository.count();
      const totalOrders = await this.orderRepository.count();

      const totalRevenue = await this.orderRepository
        .createQueryBuilder("order")
        .select("SUM(order.totalAmount)", "total")
        .where("order.status = :status", { status: "delivered" })
        .getRawOne();

      res.json({
        success: true,
        data: {
          totalUsers,
          totalProducts,
          totalOrders,
          totalRevenue: totalRevenue?.total || 0,
        },
      });
    } catch (error) {
      console.error("Error getting stats:", error);
      res.status(500).json({
        success: false,
        message: "Lỗi khi lấy thống kê",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
}

