import { Router } from "express";
import { CategoriesController } from "../controllers/CategoriesController";

// ============================================
// ROUTES: Categories
// ============================================

const router = Router();
const categoriesController = new CategoriesController();

// GET /api/categories - Lấy danh sách danh mục
router.get("/", categoriesController.getAll.bind(categoriesController));

// GET /api/categories/:id - Lấy chi tiết danh mục
router.get("/:id", categoriesController.getById.bind(categoriesController));

// POST /api/categories - Tạo danh mục mới
router.post("/", categoriesController.create.bind(categoriesController));

export default router;

