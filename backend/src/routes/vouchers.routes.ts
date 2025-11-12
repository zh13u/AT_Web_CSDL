import { Router } from "express";
import { VouchersController } from "../controllers/VouchersController";
import { authMiddleware, adminMiddleware } from "../middlewares/auth.middleware";

const router = Router();
const vouchersController = new VouchersController();

// GET /api/vouchers - Lấy danh sách vouchers (public)
router.get("/", vouchersController.getAll.bind(vouchersController));

// GET /api/vouchers/validate/:code - Validate voucher code
router.get("/validate/:code", vouchersController.validate.bind(vouchersController));

// Admin routes
router.use(authMiddleware);
router.use(adminMiddleware);

// POST /api/vouchers - Tạo voucher mới (admin only)
router.post("/", vouchersController.create.bind(vouchersController));

// PUT /api/vouchers/:id - Cập nhật voucher (admin only)
router.put("/:id", vouchersController.update.bind(vouchersController));

// DELETE /api/vouchers/:id - Xóa voucher (admin only)
router.delete("/:id", vouchersController.delete.bind(vouchersController));

export default router;

