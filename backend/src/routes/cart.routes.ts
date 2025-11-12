import { Router } from "express";
import { CartController } from "../controllers/CartController";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();
const cartController = new CartController();

// Tất cả routes đều cần đăng nhập
router.use(authMiddleware);

// GET /api/cart - Lấy giỏ hàng của user
router.get("/", cartController.getCart.bind(cartController));

// POST /api/cart/items - Thêm sản phẩm vào giỏ
router.post("/items", cartController.addItem.bind(cartController));

// PUT /api/cart/items/:itemId - Cập nhật số lượng
router.put("/items/:itemId", cartController.updateItem.bind(cartController));

// DELETE /api/cart/items/:itemId - Xóa sản phẩm khỏi giỏ
router.delete("/items/:itemId", cartController.removeItem.bind(cartController));

// DELETE /api/cart - Xóa toàn bộ giỏ hàng
router.delete("/", cartController.clearCart.bind(cartController));

export default router;

