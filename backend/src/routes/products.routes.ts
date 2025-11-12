import { Router } from "express";
import { ProductsController } from "../controllers/ProductsController";

// ============================================
// ROUTES: Products
// ============================================
// File này định nghĩa các routes cho Products API

const router = Router();
const productsController = new ProductsController();

// GET /api/products - Lấy danh sách sản phẩm (có phân trang, filter)
router.get("/", productsController.getAll.bind(productsController));

// GET /api/products/:id - Lấy chi tiết một sản phẩm
router.get("/:id", productsController.getById.bind(productsController));

// POST /api/products - Tạo sản phẩm mới (cần admin)
router.post("/", productsController.create.bind(productsController));

// PUT /api/products/:id - Cập nhật sản phẩm (cần admin)
router.put("/:id", productsController.update.bind(productsController));

// DELETE /api/products/:id - Xóa sản phẩm (cần admin)
router.delete("/:id", productsController.delete.bind(productsController));

export default router;

