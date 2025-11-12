import { Response } from "express";
import { AppDataSource } from "../data-source";
import { Review } from "../entities/Review";
import { Product } from "../entities/Product";
import { AuthRequest } from "../middlewares/auth.middleware";

export class ReviewsController {
  private reviewRepository = AppDataSource.getRepository(Review);
  private productRepository = AppDataSource.getRepository(Product);

  // GET /api/reviews/product/:productId - Lấy reviews của sản phẩm
  async getByProduct(req: any, res: Response) {
    try {
      const { productId } = req.params;

      const reviews = await this.reviewRepository.find({
        where: { productId: parseInt(productId) },
        relations: ["user"],
        order: { reviewDate: "DESC" },
      });

      res.json({
        success: true,
        data: reviews,
      });
    } catch (error) {
      console.error("Error getting reviews:", error);
      res.status(500).json({
        success: false,
        message: "Lỗi khi lấy danh sách đánh giá",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  // POST /api/reviews - Tạo review mới
  async create(req: AuthRequest, res: Response) {
    try {
      const userId = req.userId!;
      const { productId, rating, comment } = req.body;

      if (!productId || !rating) {
        return res.status(400).json({
          success: false,
          message: "Thiếu productId hoặc rating",
        });
      }

      if (rating < 1 || rating > 5) {
        return res.status(400).json({
          success: false,
          message: "Rating phải từ 1 đến 5",
        });
      }

      // Kiểm tra sản phẩm
      const product = await this.productRepository.findOne({
        where: { productId: parseInt(productId) },
      });

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Không tìm thấy sản phẩm",
        });
      }

      // Kiểm tra đã review chưa
      const existingReview = await this.reviewRepository.findOne({
        where: { userId, productId: parseInt(productId) },
      });

      if (existingReview) {
        return res.status(400).json({
          success: false,
          message: "Bạn đã đánh giá sản phẩm này rồi",
        });
      }

      // Tạo review
      const review = this.reviewRepository.create({
        productId: parseInt(productId),
        userId,
        rating: parseInt(rating),
        comment,
        isVerified: false,
      });

      const savedReview = await this.reviewRepository.save(review);

      // Cập nhật rating trung bình của sản phẩm
      await this.updateProductRating(parseInt(productId));

      res.status(201).json({
        success: true,
        message: "Tạo đánh giá thành công",
        data: savedReview,
      });
    } catch (error) {
      console.error("Error creating review:", error);
      res.status(500).json({
        success: false,
        message: "Lỗi khi tạo đánh giá",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  // PUT /api/reviews/:id - Cập nhật review
  async update(req: AuthRequest, res: Response) {
    try {
      const userId = req.userId!;
      const { id } = req.params;
      const { rating, comment } = req.body;

      const review = await this.reviewRepository.findOne({
        where: { reviewId: parseInt(id), userId },
      });

      if (!review) {
        return res.status(404).json({
          success: false,
          message: "Không tìm thấy đánh giá",
        });
      }

      if (rating !== undefined) {
        if (rating < 1 || rating > 5) {
          return res.status(400).json({
            success: false,
            message: "Rating phải từ 1 đến 5",
          });
        }
        review.rating = parseInt(rating);
      }

      if (comment !== undefined) {
        review.comment = comment;
      }

      const updatedReview = await this.reviewRepository.save(review);

      // Cập nhật rating trung bình
      await this.updateProductRating(review.productId);

      res.json({
        success: true,
        message: "Cập nhật đánh giá thành công",
        data: updatedReview,
      });
    } catch (error) {
      console.error("Error updating review:", error);
      res.status(500).json({
        success: false,
        message: "Lỗi khi cập nhật đánh giá",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  // DELETE /api/reviews/:id - Xóa review
  async delete(req: AuthRequest, res: Response) {
    try {
      const userId = req.userId!;
      const { id } = req.params;

      const review = await this.reviewRepository.findOne({
        where: { reviewId: parseInt(id), userId },
      });

      if (!review) {
        return res.status(404).json({
          success: false,
          message: "Không tìm thấy đánh giá",
        });
      }

      const productId = review.productId;
      await this.reviewRepository.remove(review);

      // Cập nhật rating trung bình
      await this.updateProductRating(productId);

      res.json({
        success: true,
        message: "Xóa đánh giá thành công",
      });
    } catch (error) {
      console.error("Error deleting review:", error);
      res.status(500).json({
        success: false,
        message: "Lỗi khi xóa đánh giá",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  // Helper: Cập nhật rating trung bình của sản phẩm
  private async updateProductRating(productId: number) {
    const reviews = await this.reviewRepository.find({
      where: { productId },
    });

    if (reviews.length === 0) {
      await this.productRepository.update(productId, { rating: 0 });
      return;
    }

    const avgRating =
      reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

    await this.productRepository.update(productId, {
      rating: parseFloat(avgRating.toFixed(2)),
    });
  }
}

