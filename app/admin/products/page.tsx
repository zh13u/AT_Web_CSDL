"use client";

import { AdminLayout } from "@/components/AdminLayout";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useState } from "react";
import Image from "next/image";
import { Product } from "@/lib/types";

export default function AdminProducts() {
    const [searchQuery, setSearchQuery] = useState("");
    const [showAddModal, setShowAddModal] = useState(false);

    const { data: products, isLoading, refetch } = useQuery<Product[]>({
        queryKey: ["admin-products"],
        queryFn: () => api.get("/api/admin/products"),
    });

    const handleDelete = async (productId: string) => {
        if (!confirm("Bạn có chắc muốn xóa sản phẩm này?")) return;

        try {
            await api.delete(`/api/admin/products/${productId}`);
            refetch();
        } catch (error) {
            alert("Lỗi khi xóa sản phẩm");
        }
    };

    const filteredProducts = products?.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Quản lý sản phẩm</h1>
                        <p className="text-muted">
                            Tổng số: {products?.length || 0} sản phẩm
                        </p>
                    </div>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="btn-primary"
                    >
                        ➕ Thêm sản phẩm
                    </button>
                </div>

                {/* Search */}
                <div className="card p-4">
                    <input
                        type="text"
                        placeholder="🔍 Tìm kiếm sản phẩm..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-2 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-brand"
                    />
                </div>

                {/* Products Table */}
                <div className="card overflow-hidden">
                    {isLoading ? (
                        <div className="text-center py-20">
                            <div className="animate-spin text-4xl mb-4">⚙️</div>
                            <p className="text-muted">Đang tải...</p>
                        </div>
                    ) : filteredProducts && filteredProducts.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-surface">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">
                                            Sản phẩm
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">
                                            Thương hiệu
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">
                                            Giá
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">
                                            Đánh giá
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">
                                            Trạng thái
                                        </th>
                                        <th className="px-6 py-4 text-right text-sm font-semibold">
                                            Thao tác
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {filteredProducts.map((product) => (
                                        <tr key={product.id} className="hover:bg-surface/50">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-border flex-shrink-0">
                                                        <Image
                                                            src={product.thumbnail}
                                                            alt={product.name}
                                                            width={48}
                                                            height={48}
                                                            className="w-full h-full object-cover"
                                                            unoptimized
                                                        />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium">
                                                            {product.name}
                                                        </p>
                                                        <p className="text-sm text-muted">
                                                            ID: {product.id}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm">{product.brand}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div>
                                                    <p className="font-semibold">
                                                        {product.price.toLocaleString("vi-VN")}đ
                                                    </p>
                                                    {product.salePrice && (
                                                        <p className="text-sm text-error line-through">
                                                            {product.salePrice.toLocaleString("vi-VN")}đ
                                                        </p>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-1">
                                                    <span className="text-yellow-500">⭐</span>
                                                    <span className="font-medium">
                                                        {product.rating}
                                                    </span>
                                                    <span className="text-muted text-sm">
                                                        ({product.ratingCount})
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex gap-2">
                                                    {product.isHot && (
                                                        <span className="text-xs px-2 py-1 rounded bg-error/10 text-error">
                                                            🔥 Hot
                                                        </span>
                                                    )}
                                                    {product.isNew && (
                                                        <span className="text-xs px-2 py-1 rounded bg-success/10 text-success">
                                                            ✨ New
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button className="text-sm px-3 py-1 rounded-lg bg-blue-500/10 text-blue-600 hover:bg-blue-500/20">
                                                        ✏️ Sửa
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(product.id)}
                                                        className="text-sm px-3 py-1 rounded-lg bg-error/10 text-error hover:bg-error/20"
                                                    >
                                                        🗑️ Xóa
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <p className="text-4xl mb-4">📱</p>
                            <p className="text-muted">Không tìm thấy sản phẩm</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Add Product Modal (TODO) */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="card max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <h2 className="text-2xl font-bold mb-4">Thêm sản phẩm mới</h2>
                            <p className="text-muted mb-4">
                                Chức năng này đang phát triển...
                            </p>
                            <button
                                onClick={() => setShowAddModal(false)}
                                className="btn-outline w-full"
                            >
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
