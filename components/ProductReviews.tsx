"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { api } from "@/lib/api";
import { RatingStars } from "./RatingStars";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { useAuth } from "@/hooks/useAuth";
import { AuthDialog } from "./AuthDialog";
import { useUIStore } from "@/store/ui";

interface Review {
    id: string;
    user: {
        name: string;
        verifiedPurchase: boolean;
    };
    rating: number;
    content: string;
    createdAt: string;
    images?: string[];
}

interface ReviewsResponse {
    items: Review[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
}

interface ProductReviewsProps {
    productSlug: string;
    productId: string;
}

export function ProductReviews({ productSlug, productId }: ProductReviewsProps) {
    const [page, setPage] = useState(1);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [showAuthDialog, setShowAuthDialog] = useState(false);
    const [rating, setRating] = useState(5);
    const [content, setContent] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { user } = useAuth();
    const { addToast } = useUIStore();

    const { data: reviews, refetch } = useQuery<ReviewsResponse>({
        queryKey: ["reviews", productSlug, page],
        queryFn: () => api.get(`/api/products/${productSlug}/reviews?page=${page}`),
    });

    const handleSubmitReview = async () => {
        if (!user) {
            setShowAuthDialog(true);
            return;
        }

        if (!content.trim()) {
            addToast("error", "Vui lòng nhập nội dung đánh giá");
            return;
        }

        setIsSubmitting(true);
        try {
            await api.post(`/api/products/${productSlug}/reviews`, {
                rating,
                content: content.trim(),
            });

            addToast("success", "Cảm ơn bạn đã đánh giá!");
            setContent("");
            setRating(5);
            setShowReviewForm(false);
            refetch();
        } catch (error: any) {
            addToast("error", error.message || "Không thể gửi đánh giá");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="card p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">
                    Đánh giá sản phẩm ({reviews?.total || 0})
                </h2>

                {!showReviewForm && (
                    <button
                        onClick={() => {
                            if (!user) {
                                setShowAuthDialog(true);
                                return;
                            }
                            setShowReviewForm(true);
                        }}
                        className="btn-outline"
                    >
                        Viết đánh giá
                    </button>
                )}
            </div>

            {/* Review Form */}
            {showReviewForm && (
                <div className="bg-surface p-4 rounded-xl mb-6">
                    <h3 className="font-semibold mb-4">Viết đánh giá của bạn</h3>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Đánh giá</label>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    onClick={() => setRating(star)}
                                    className="text-2xl hover:scale-110 transition-transform"
                                >
                                    {star <= rating ? "⭐" : "☆"}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">
                            Nội dung đánh giá
                        </label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full px-4 py-2 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-brand"
                            rows={4}
                            placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm..."
                        />
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={handleSubmitReview}
                            disabled={isSubmitting}
                            className="btn-primary"
                        >
                            {isSubmitting ? "Đang gửi..." : "Gửi đánh giá"}
                        </button>
                        <button
                            onClick={() => {
                                setShowReviewForm(false);
                                setContent("");
                                setRating(5);
                            }}
                            className="btn-outline"
                        >
                            Hủy
                        </button>
                    </div>
                </div>
            )}

            {/* Reviews List */}
            {reviews && reviews.items.length > 0 ? (
                <div className="space-y-4">
                    {reviews.items.map((review) => (
                        <div key={review.id} className="border-b border-border pb-4 last:border-0">
                            <div className="flex items-start gap-3 mb-2">
                                <div className="w-10 h-10 rounded-full bg-brand text-brand-fg flex items-center justify-center font-semibold">
                                    {review.user.name.charAt(0).toUpperCase()}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-medium">{review.user.name}</span>
                                        {review.user.verifiedPurchase && (
                                            <span className="text-xs bg-success/10 text-success px-2 py-0.5 rounded">
                                                ✓ Đã mua hàng
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <RatingStars rating={review.rating} size="sm" />
                                        <span className="text-xs text-muted">
                                            {formatDistanceToNow(new Date(review.createdAt), {
                                                addSuffix: true,
                                                locale: vi,
                                            })}
                                        </span>
                                    </div>
                                    <p className="text-muted">{review.content}</p>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Pagination */}
                    {reviews.totalPages > 1 && (
                        <div className="flex justify-center gap-2 mt-6">
                            <button
                                onClick={() => setPage(page - 1)}
                                disabled={page === 1}
                                className="btn-outline disabled:opacity-50"
                            >
                                Trước
                            </button>
                            <span className="py-2 px-4">
                                Trang {page} / {reviews.totalPages}
                            </span>
                            <button
                                onClick={() => setPage(page + 1)}
                                disabled={page === reviews.totalPages}
                                className="btn-outline disabled:opacity-50"
                            >
                                Sau
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <div className="text-center py-8 text-muted">
                    <p>Chưa có đánh giá nào</p>
                    <p className="text-sm mt-2">Hãy là người đầu tiên đánh giá sản phẩm này!</p>
                </div>
            )}

            <AuthDialog
                isOpen={showAuthDialog}
                onClose={() => setShowAuthDialog(false)}
                redirectUrl={`/dien-thoai/${productSlug}`}
            />
        </div>
    );
}
