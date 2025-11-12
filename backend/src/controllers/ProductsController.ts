import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Product } from "../entities/Product";
import { Category } from "../entities/Category";

// ============================================
// CONTROLLER: Products
// ============================================
// Controller xử lý logic cho Products API

export class ProductsController {
  private productRepository = AppDataSource.getRepository(Product);
  private categoryRepository = AppDataSource.getRepository(Category);

  // GET /api/products - Lấy danh sách sản phẩm
  async getAll(req: Request, res: Response) {
    try {
      const {
        page = "1",
        limit = "10",
        categoryId,
        brand,
        minPrice,
        maxPrice,
        search,
      } = req.query;

      const pageNum = parseInt(page as string);
      const limitNum = parseInt(limit as string);
      const skip = (pageNum - 1) * limitNum;

      // Tạo query builder
      const queryBuilder = this.productRepository
        .createQueryBuilder("product")
        .leftJoinAndSelect("product.category", "category")
        .where("product.isActive = :isActive", { isActive: true });

      // Filter theo category
      if (categoryId) {
        queryBuilder.andWhere("product.categoryId = :categoryId", {
          categoryId: parseInt(categoryId as string),
        });
      }

      // Filter theo brand
      if (brand) {
        queryBuilder.andWhere("product.brand = :brand", { brand });
      }

      // Filter theo giá
      if (minPrice) {
        queryBuilder.andWhere("product.price >= :minPrice", {
          minPrice: parseFloat(minPrice as string),
        });
      }
      if (maxPrice) {
        queryBuilder.andWhere("product.price <= :maxPrice", {
          maxPrice: parseFloat(maxPrice as string),
        });
      }

      // Search theo tên
      if (search) {
        queryBuilder.andWhere("product.name LIKE :search", {
          search: `%${search}%`,
        });
      }

      // Sắp xếp và phân trang
      const [products, total] = await queryBuilder
        .orderBy("product.dateAdded", "DESC")
        .skip(skip)
        .take(limitNum)
        .getManyAndCount();

      res.json({
        success: true,
        data: products,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          totalPages: Math.ceil(total / limitNum),
        },
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

  // GET /api/products/:id - Lấy chi tiết sản phẩm
  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const product = await this.productRepository.findOne({
        where: { productId: parseInt(id) },
        relations: ["category", "reviews"],
      });

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Không tìm thấy sản phẩm",
        });
      }

      res.json({
        success: true,
        data: product,
      });
    } catch (error) {
      console.error("Error getting product:", error);
      res.status(500).json({
        success: false,
        message: "Lỗi khi lấy thông tin sản phẩm",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  // POST /api/products - Tạo sản phẩm mới
  async create(req: Request, res: Response) {
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

      // Validate dữ liệu
      if (!name || !price || !categoryId || !brand) {
        return res.status(400).json({
          success: false,
          message: "Thiếu thông tin bắt buộc: name, price, categoryId, brand",
        });
      }

      // Kiểm tra category có tồn tại không
      const category = await this.categoryRepository.findOne({
        where: { categoryId: parseInt(categoryId) },
      });

      if (!category) {
        return res.status(404).json({
          success: false,
          message: "Không tìm thấy danh mục",
        });
      }

      // Tạo sản phẩm mới
      const product = this.productRepository.create({
        name,
        description,
        price: parseFloat(price),
        stock: parseInt(stock) || 0,
        categoryId: parseInt(categoryId),
        brand,
        imageUrl,
        rating: 0,
        isActive: true,
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

  // PUT /api/products/:id - Cập nhật sản phẩm
  async update(req: Request, res: Response) {
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

      // Cập nhật dữ liệu
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

  // DELETE /api/products/:id - Xóa sản phẩm (soft delete)
  async delete(req: Request, res: Response) {
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

      // Soft delete: chỉ set isActive = false
      product.isActive = false;
      await this.productRepository.save(product);

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
}

