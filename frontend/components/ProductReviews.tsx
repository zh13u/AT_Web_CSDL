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
    attachments?: {
        type: string;
        url: string;
        name?: string;
        size?: number;
    }[];
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
    const [attachments, setAttachments] = useState<File[]>([]);
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
            const formData = new FormData();
            formData.append("rating", rating.toString());
            formData.append("content", content.trim());

            // Attach files
            attachments.forEach((file, index) => {
                formData.append(`attachments`, file);
            });

            await api.post(`/api/products/${productSlug}/reviews`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            addToast("success", "Cảm ơn bạn đã đánh giá!");
            setContent("");
            setRating(5);
            setAttachments([]);
            setShowReviewForm(false);
            refetch();
        } catch (error: any) {
            addToast("error", error.message || "Không thể gửi đánh giá");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length + attachments.length > 5) {
            addToast("error", "Chỉ được đính kèm tối đa 5 file");
            return;
        }
        setAttachments([...attachments, ...files]);
    };

    const removeAttachment = (index: number) => {
        setAttachments(attachments.filter((_, i) => i !== index));
    };

    const getFileIcon = (file: File) => {
        if (file.type.startsWith("image/")) return "🖼️";
        if (file.type.startsWith("video/")) return "🎥";
        if (file.type.startsWith("audio/")) return "🎵";
        if (file.type.includes("pdf")) return "📄";
        if (file.type.includes("word") || file.type.includes("document")) return "📝";
        if (file.type.includes("excel") || file.type.includes("sheet")) return "📊";
        return "📎";
    };

    const formatFileSize = (bytes: number) => {
        if (bytes < 1024) return bytes + " B";
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
        return (bytes / (1024 * 1024)).toFixed(1) + " MB";
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

                    {/* File Attachments */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">
                            Đính kèm file (tối đa 5 file)
                        </label>

                        {/* Attachment List */}
                        {attachments.length > 0 && (
                            <div className="mb-3 space-y-2">
                                {attachments.map((file, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-3 p-3 bg-surface border border-border rounded-lg hover:border-brand/50 transition-colors"
                                    >
                                        {/* File Preview/Icon */}
                                        {file.type.startsWith("image/") ? (
                                            <div className="w-12 h-12 rounded-lg overflow-hidden bg-border flex-shrink-0">
                                                <img
                                                    src={URL.createObjectURL(file)}
                                                    alt={file.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        ) : (
                                            <div className="w-12 h-12 rounded-lg bg-brand/10 flex items-center justify-center text-2xl flex-shrink-0">
                                                {getFileIcon(file)}
                                            </div>
                                        )}

                                        {/* File Info */}
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium truncate">
                                                {file.name}
                                            </p>
                                            <p className="text-xs text-muted">
                                                {formatFileSize(file.size)}
                                            </p>
                                        </div>

                                        {/* Remove Button */}
                                        <button
                                            onClick={() => removeAttachment(index)}
                                            className="w-8 h-8 rounded-full bg-error/10 text-error hover:bg-error/20 transition-colors flex items-center justify-center flex-shrink-0"
                                            title="Xóa file"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Upload Button */}
                        {attachments.length < 5 && (
                            <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-dashed border-border hover:border-brand cursor-pointer transition-colors">
                                <span className="text-xl">📎</span>
                                <span className="text-sm font-medium">
                                    Đính kèm file
                                </span>
                                <input
                                    type="file"
                                    multiple
                                    onChange={handleFileSelect}
                                    className="hidden"
                                    accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.xls,.xlsx,.txt"
                                />
                            </label>
                        )}

                        <p className="text-xs text-muted mt-2">
                            💡 Hỗ trợ: Hình ảnh, Video, Audio, PDF, Word, Excel ({5 - attachments.length} file còn lại)
                        </p>
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
                                setAttachments([]);
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
                                    <p className="text-muted mb-3">{review.content}</p>

                                    {/* Review Attachments */}
                                    {review.attachments && review.attachments.length > 0 && (
                                        <div className="space-y-2 mt-3">
                                            {review.attachments.map((attachment, idx) => {
                                                const isImage = attachment.type?.startsWith("image/") || attachment.url?.match(/\.(jpg|jpeg|png|gif|webp)$/i);
                                                const isVideo = attachment.type?.startsWith("video/") || attachment.url?.match(/\.(mp4|webm|ogg)$/i);

                                                return isImage ? (
                                                    <div key={idx} className="inline-block mr-2 mb-2">
                                                        <img
                                                            src={attachment.url}
                                                            alt={attachment.name || "Review image"}
                                                            className="max-w-[200px] max-h-[200px] rounded-lg object-cover border border-border cursor-pointer hover:opacity-80 transition-opacity"
                                                            onClick={() => window.open(attachment.url, "_blank")}
                                                        />
                                                    </div>
                                                ) : isVideo ? (
                                                    <div key={idx} className="inline-block mr-2 mb-2">
                                                        <video
                                                            src={attachment.url}
                                                            controls
                                                            className="max-w-[300px] max-h-[200px] rounded-lg border border-border"
                                                        />
                                                    </div>
                                                ) : (
                                                    <a
                                                        key={idx}
                                                        href={attachment.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-2 px-3 py-2 bg-surface border border-border rounded-lg hover:border-brand transition-colors mr-2 mb-2"
                                                    >
                                                        <span className="text-lg">
                                                            {attachment.type?.includes("pdf") ? "📄" :
                                                                attachment.type?.includes("word") || attachment.type?.includes("document") ? "📝" :
                                                                    attachment.type?.includes("excel") || attachment.type?.includes("sheet") ? "📊" :
                                                                        attachment.type?.startsWith("audio/") ? "🎵" : "📎"}
                                                        </span>
                                                        <div className="text-left">
                                                            <p className="text-sm font-medium">
                                                                {attachment.name || "File đính kèm"}
                                                            </p>
                                                            {attachment.size && (
                                                                <p className="text-xs text-muted">
                                                                    {formatFileSize(attachment.size)}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </a>
                                                );
                                            })}
                                        </div>
                                    )}
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
