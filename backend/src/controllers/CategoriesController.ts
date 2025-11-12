import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Category } from "../entities/Category";

// ============================================
// CONTROLLER: Categories
// ============================================

export class CategoriesController {
  private categoryRepository = AppDataSource.getRepository(Category);

  // GET /api/categories - Lấy danh sách danh mục
  async getAll(req: Request, res: Response) {
    try {
      const categories = await this.categoryRepository.find({
        relations: ["products"],
      });

      res.json({
        success: true,
        data: categories,
      });
    } catch (error) {
      console.error("Error getting categories:", error);
      res.status(500).json({
        success: false,
        message: "Lỗi khi lấy danh sách danh mục",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  // GET /api/categories/:id - Lấy chi tiết danh mục
  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const category = await this.categoryRepository.findOne({
        where: { categoryId: parseInt(id) },
        relations: ["products"],
      });

      if (!category) {
        return res.status(404).json({
          success: false,
          message: "Không tìm thấy danh mục",
        });
      }

      res.json({
        success: true,
        data: category,
      });
    } catch (error) {
      console.error("Error getting category:", error);
      res.status(500).json({
        success: false,
        message: "Lỗi khi lấy thông tin danh mục",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  // POST /api/categories - Tạo danh mục mới
  async create(req: Request, res: Response) {
    try {
      const { categoryName, description } = req.body;

      if (!categoryName) {
        return res.status(400).json({
          success: false,
          message: "Thiếu tên danh mục",
        });
      }

      const category = this.categoryRepository.create({
        categoryName,
        description,
      });

      const savedCategory = await this.categoryRepository.save(category);

      res.status(201).json({
        success: true,
        message: "Tạo danh mục thành công",
        data: savedCategory,
      });
    } catch (error) {
      console.error("Error creating category:", error);
      res.status(500).json({
        success: false,
        message: "Lỗi khi tạo danh mục",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
}

