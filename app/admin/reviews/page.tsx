"use client";

import { AdminLayout } from "@/components/AdminLayout";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

interface Review {
    id: string;
    productName: string;
    userName: string;
    rating: number;
    content: string;
    createdAt: string;
    status: "pending" | "approved" | "rejected";
}

const STATUS_LABELS = {
    pending: { label: "Chờ duyệt", color: "bg-yellow-500/10 text-yellow-600" },
    approved: { label: "Đã duyệt", color: "bg-green-500/10 text-green-600" },
    rejected: { label: "Từ chối", color: "bg-error/10 text-error" },
};

export default function AdminReviews() {
    const { data: reviews, isLoading, refetch } = useQuery<Review[]>({
        queryKey: ["admin-reviews"],
        queryFn: () => api.get("/api/admin/reviews"),
    });

    const handleUpdateStatus = async (reviewId: string, status: string) => {
        try {
            await api.put(`/api/admin/reviews/${reviewId}`, { status });
            refetch();
        } catch (error) {
            alert("Lỗi khi cập nhật trạng thái");
        }
    };

    const handleDelete = async (reviewId: string) => {
        if (!confirm("Bạn có chắc muốn xóa đánh giá này?")) return;

        try {
            await api.delete(`/api/admin/reviews/${reviewId}`);
            refetch();
        } catch (error) {
            alert("Lỗi khi xóa đánh giá");
        }
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold mb-2">Quản lý đánh giá</h1>
                    <p className="text-muted">
                        Tổng số: {reviews?.length || 0} đánh giá
                        {reviews && (
                            <span className="ml-2">
                                ({reviews.filter((r) => r.status === "pending").length} chờ duyệt)
                            </span>
                        )}
                    </p>
                </div>

                {/* Reviews List */}
                <div className="space-y-4">
                    {isLoading ? (
                        <div className="card text-center py-20">
                            <div className="animate-spin text-4xl mb-4">⚙️</div>
                            <p className="text-muted">Đang tải...</p>
                        </div>
                    ) : reviews && reviews.length > 0 ? (
                        reviews.map((review) => (
                            <div key={review.id} className="card p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-full bg-brand text-brand-fg flex items-center justify-center font-semibold">
                                            {review.userName.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="font-medium">{review.userName}</p>
                                            <p className="text-sm text-muted">
                                                {review.productName}
                                            </p>
                                            <p className="text-xs text-muted">
                                                {new Date(review.createdAt).toLocaleString("vi-VN")}
                                            </p>
                                        </div>
                                    </div>
                                    <span
                                        className={`text-xs px-3 py-1 rounded-full ${STATUS_LABELS[review.status].color
                                            }`}
                                    >
                                        {STATUS_LABELS[review.status].label}
                                    </span>
                                </div>

                                <div className="mb-4">
                                    <div className="flex items-center gap-1 mb-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <span
                                                key={star}
                                                className={
                                                    star <= review.rating
                                                        ? "text-yellow-500"
                                                        : "text-gray-300"
                                                }
                                            >
                                                ⭐
                                            </span>
                                        ))}
                                    </div>
                                    <p className="text-muted">{review.content}</p>
                                </div>

                                <div className="flex gap-2">
                                    {review.status === "pending" && (
                                        <>
                                            <button
                                                onClick={() =>
                                                    handleUpdateStatus(review.id, "approved")
                                                }
                                                className="btn-primary text-sm"
                                            >
                                                ✅ Duyệt
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleUpdateStatus(review.id, "rejected")
                                                }
                                                className="btn-outline text-sm"
                                            >
                                                ❌ Từ chối
                                            </button>
                                        </>
                                    )}
                                    <button
                                        onClick={() => handleDelete(review.id)}
                                        className="text-sm px-3 py-1 rounded-lg bg-error/10 text-error hover:bg-error/20"
                                    >
                                        🗑️ Xóa
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="card text-center py-20">
                            <p className="text-4xl mb-4">⭐</p>
                            <p className="text-muted">Chưa có đánh giá nào</p>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
