import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Voucher } from "../entities/Voucher";

export class VouchersController {
  private voucherRepository = AppDataSource.getRepository(Voucher);

  // GET /api/vouchers - Lấy danh sách vouchers active
  async getAll(req: Request, res: Response) {
    try {
      const vouchers = await this.voucherRepository.find({
        where: { isActive: true },
        order: { expiryDate: "ASC" },
      });

      res.json({
        success: true,
        data: vouchers,
      });
    } catch (error) {
      console.error("Error getting vouchers:", error);
      res.status(500).json({
        success: false,
        message: "Lỗi khi lấy danh sách voucher",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  // GET /api/vouchers/validate/:code - Validate voucher
  async validate(req: Request, res: Response) {
    try {
      const { code } = req.params;
      const { orderAmount } = req.query;

      const voucher = await this.voucherRepository.findOne({
        where: { code, isActive: true },
      });

      if (!voucher) {
        return res.status(404).json({
          success: false,
          message: "Voucher không tồn tại hoặc đã bị vô hiệu hóa",
        });
      }

      // Kiểm tra hết hạn
      if (new Date() > voucher.expiryDate) {
        return res.status(400).json({
          success: false,
          message: "Voucher đã hết hạn",
        });
      }

      // Kiểm tra số lần sử dụng
      if (voucher.usageLimit > 0 && voucher.usedCount >= voucher.usageLimit) {
        return res.status(400).json({
          success: false,
          message: "Voucher đã hết lượt sử dụng",
        });
      }

      // Kiểm tra số tiền đơn hàng tối thiểu
      if (orderAmount) {
        const amount = parseFloat(orderAmount as string);
        if (amount < parseFloat(voucher.minOrderAmount.toString())) {
          return res.status(400).json({
            success: false,
            message: `Đơn hàng tối thiểu ${voucher.minOrderAmount} để sử dụng voucher này`,
          });
        }
      }

      res.json({
        success: true,
        message: "Voucher hợp lệ",
        data: voucher,
      });
    } catch (error) {
      console.error("Error validating voucher:", error);
      res.status(500).json({
        success: false,
        message: "Lỗi khi validate voucher",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  // POST /api/vouchers - Tạo voucher mới (admin)
  async create(req: Request, res: Response) {
    try {
      const {
        code,
        discountAmount,
        discountPercent,
        expiryDate,
        minOrderAmount,
        usageLimit,
      } = req.body;

      if (!code || !expiryDate) {
        return res.status(400).json({
          success: false,
          message: "Thiếu code hoặc expiryDate",
        });
      }

      // Kiểm tra code đã tồn tại chưa
      const existing = await this.voucherRepository.findOne({
        where: { code },
      });

      if (existing) {
        return res.status(400).json({
          success: false,
          message: "Code đã tồn tại",
        });
      }

      const voucher = this.voucherRepository.create({
        code,
        discountAmount: discountAmount || 0,
        discountPercent: discountPercent || 0,
        expiryDate: new Date(expiryDate),
        minOrderAmount: minOrderAmount || 0,
        usageLimit: usageLimit || 0,
        isActive: true,
        usedCount: 0,
      });

      const savedVoucher = await this.voucherRepository.save(voucher);

      res.status(201).json({
        success: true,
        message: "Tạo voucher thành công",
        data: savedVoucher,
      });
    } catch (error) {
      console.error("Error creating voucher:", error);
      res.status(500).json({
        success: false,
        message: "Lỗi khi tạo voucher",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  // PUT /api/vouchers/:id - Cập nhật voucher (admin)
  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const voucher = await this.voucherRepository.findOne({
        where: { voucherId: parseInt(id) },
      });

      if (!voucher) {
        return res.status(404).json({
          success: false,
          message: "Không tìm thấy voucher",
        });
      }

      Object.assign(voucher, updateData);
      const updatedVoucher = await this.voucherRepository.save(voucher);

      res.json({
        success: true,
        message: "Cập nhật voucher thành công",
        data: updatedVoucher,
      });
    } catch (error) {
      console.error("Error updating voucher:", error);
      res.status(500).json({
        success: false,
        message: "Lỗi khi cập nhật voucher",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  // DELETE /api/vouchers/:id - Xóa voucher (admin)
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const voucher = await this.voucherRepository.findOne({
        where: { voucherId: parseInt(id) },
      });

      if (!voucher) {
        return res.status(404).json({
          success: false,
          message: "Không tìm thấy voucher",
        });
      }

      // Soft delete
      voucher.isActive = false;
      await this.voucherRepository.save(voucher);

      res.json({
        success: true,
        message: "Xóa voucher thành công",
      });
    } catch (error) {
      console.error("Error deleting voucher:", error);
      res.status(500).json({
        success: false,
        message: "Lỗi khi xóa voucher",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
}

