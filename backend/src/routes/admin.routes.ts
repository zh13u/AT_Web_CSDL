import { Router } from "express";
import { AdminController } from "../controllers/AdminController";
import { authMiddleware, adminMiddleware } from "../middlewares/auth.middleware";

const router = Router();
const adminController = new AdminController();

// Tất cả routes đều cần admin
router.use(authMiddleware);
router.use(adminMiddleware);

// Users Management
router.get("/users", adminController.getUsers.bind(adminController));
router.get("/users/:id", adminController.getUserById.bind(adminController));
router.put("/users/:id", adminController.updateUser.bind(adminController));

// Orders Management
router.get("/orders", adminController.getOrders.bind(adminController));
router.get("/orders/:id", adminController.getOrderById.bind(adminController));
router.put("/orders/:id/status", adminController.updateOrderStatus.bind(adminController));

// Products Management (sử dụng ProductsController nhưng với admin middleware)
router.get("/products", adminController.getAllProducts.bind(adminController));
router.post("/products", adminController.createProduct.bind(adminController));
router.put("/products/:id", adminController.updateProduct.bind(adminController));
router.delete("/products/:id", adminController.deleteProduct.bind(adminController));

// Statistics
router.get("/stats", adminController.getStats.bind(adminController));

export default router;

