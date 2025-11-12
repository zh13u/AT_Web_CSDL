import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();
const authController = new AuthController();

// POST /api/auth/register - Đăng ký
router.post("/register", authController.register.bind(authController));

// POST /api/auth/login - Đăng nhập
router.post("/login", authController.login.bind(authController));

// GET /api/auth/me - Lấy thông tin user hiện tại (cần đăng nhập)
router.get("/me", authMiddleware, authController.getMe.bind(authController));

export default router;

