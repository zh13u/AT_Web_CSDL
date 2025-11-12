import { Router } from "express";
import { OrdersController } from "../controllers/OrdersController";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();
const ordersController = new OrdersController();

// Tất cả routes đều cần đăng nhập
router.use(authMiddleware);

// GET /api/orders - Lấy danh sách đơn hàng của user
router.get("/", ordersController.getOrders.bind(ordersController));

// GET /api/orders/:id - Lấy chi tiết đơn hàng
router.get("/:id", ordersController.getOrderById.bind(ordersController));

// POST /api/orders - Tạo đơn hàng mới
router.post("/", ordersController.createOrder.bind(ordersController));

// PUT /api/orders/:id/status - Cập nhật trạng thái đơn hàng
router.put("/:id/status", ordersController.updateStatus.bind(ordersController));

export default router;

