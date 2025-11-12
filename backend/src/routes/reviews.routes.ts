import { Router } from "express";
import { ReviewsController } from "../controllers/ReviewsController";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();
const reviewsController = new ReviewsController();

// GET /api/reviews/product/:productId - Lấy reviews của sản phẩm (không cần đăng nhập)
router.get("/product/:productId", reviewsController.getByProduct.bind(reviewsController));

// Tất cả routes còn lại cần đăng nhập
router.use(authMiddleware);

// POST /api/reviews - Tạo review mới
router.post("/", reviewsController.create.bind(reviewsController));

// PUT /api/reviews/:id - Cập nhật review
router.put("/:id", reviewsController.update.bind(reviewsController));

// DELETE /api/reviews/:id - Xóa review
router.delete("/:id", reviewsController.delete.bind(reviewsController));

export default router;

