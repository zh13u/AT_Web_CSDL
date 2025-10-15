"use client";

import { AdminLayout } from "@/components/AdminLayout";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

interface DashboardStats {
    totalProducts: number;
    totalOrders: number;
    totalUsers: number;
    totalRevenue: number;
    recentOrders: Array<{
        id: string;
        customerName: string;
        total: number;
        status: string;
        createdAt: string;
    }>;
    lowStockProducts: Array<{
        id: string;
        name: string;
        stock: number;
    }>;
}

export default function AdminDashboard() {
    const { data: stats, isLoading } = useQuery<DashboardStats>({
        queryKey: ["admin-stats"],
        queryFn: () => api.get("/api/admin/stats"),
    });

    if (isLoading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center py-20">
                    <div className="text-center">
                        <div className="animate-spin text-4xl mb-4">⚙️</div>
                        <p className="text-muted">Đang tải dữ liệu...</p>
                    </div>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Page Header */}
                <div>
                    <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
                    <p className="text-muted">Tổng quan hệ thống</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="card p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center text-2xl flex-shrink-0">
                                📱
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="text-sm text-muted">Sản phẩm</p>
                                <p className="text-2xl font-bold">{stats?.totalProducts || 0}</p>
                            </div>
                        </div>
                    </div>

                    <div className="card p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-green-500/10 text-green-500 flex items-center justify-center text-2xl flex-shrink-0">
                                📦
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="text-sm text-muted">Đơn hàng</p>
                                <p className="text-2xl font-bold">{stats?.totalOrders || 0}</p>
                            </div>
                        </div>
                    </div>

                    <div className="card p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center text-2xl flex-shrink-0">
                                👥
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="text-sm text-muted">Người dùng</p>
                                <p className="text-2xl font-bold">{stats?.totalUsers || 0}</p>
                            </div>
                        </div>
                    </div>

                    <div className="card p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center text-2xl flex-shrink-0">
                                💰
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="text-sm text-muted">Doanh thu</p>
                                <p className="text-xl font-bold break-words">
                                    {(stats?.totalRevenue || 0).toLocaleString("vi-VN")}đ
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Orders */}
                    <div className="card p-6">
                        <h2 className="text-xl font-bold mb-4">Đơn hàng mới</h2>
                        <div className="space-y-3">
                            {stats?.recentOrders && stats.recentOrders.length > 0 ? (
                                stats.recentOrders.map((order) => (
                                    <div
                                        key={order.id}
                                        className="flex items-center justify-between p-3 bg-surface rounded-lg"
                                    >
                                        <div>
                                            <p className="font-medium">{order.customerName}</p>
                                            <p className="text-sm text-muted">
                                                {new Date(order.createdAt).toLocaleString("vi-VN")}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold">
                                                {order.total.toLocaleString("vi-VN")}đ
                                            </p>
                                            <span
                                                className={`text-xs px-2 py-1 rounded ${order.status === "pending"
                                                    ? "bg-yellow-500/10 text-yellow-600"
                                                    : order.status === "completed"
                                                        ? "bg-green-500/10 text-green-600"
                                                        : "bg-blue-500/10 text-blue-600"
                                                    }`}
                                            >
                                                {order.status === "pending"
                                                    ? "Chờ xử lý"
                                                    : order.status === "completed"
                                                        ? "Hoàn thành"
                                                        : "Đang xử lý"}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-muted py-8">Chưa có đơn hàng</p>
                            )}
                        </div>
                    </div>

                    {/* Low Stock Products */}
                    <div className="card p-6">
                        <h2 className="text-xl font-bold mb-4">Sản phẩm sắp hết hàng</h2>
                        <div className="space-y-3">
                            {stats?.lowStockProducts && stats.lowStockProducts.length > 0 ? (
                                stats.lowStockProducts.map((product) => (
                                    <div
                                        key={product.id}
                                        className="flex items-center justify-between p-3 bg-surface rounded-lg"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="text-2xl">⚠️</div>
                                            <p className="font-medium">{product.name}</p>
                                        </div>
                                        <span className="text-sm font-semibold text-error">
                                            Còn {product.stock}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-muted py-8">
                                    Tất cả sản phẩm còn đủ hàng
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
