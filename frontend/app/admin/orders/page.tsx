"use client";

import { AdminLayout } from "@/components/AdminLayout";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useState } from "react";

interface Order {
    id: string;
    customerName: string;
    customerPhone: string;
    customerAddress: string;
    items: Array<{ name: string; quantity: number; price: number }>;
    total: number;
    status: "pending" | "processing" | "shipping" | "completed" | "cancelled";
    paymentMethod: string;
    createdAt: string;
}

const STATUS_LABELS = {
    pending: { label: "Chờ xử lý", color: "bg-yellow-500/10 text-yellow-600" },
    processing: { label: "Đang xử lý", color: "bg-blue-500/10 text-blue-600" },
    shipping: { label: "Đang giao", color: "bg-purple-500/10 text-purple-600" },
    completed: { label: "Hoàn thành", color: "bg-green-500/10 text-green-600" },
    cancelled: { label: "Đã hủy", color: "bg-error/10 text-error" },
};

export default function AdminOrders() {
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    const { data: orders, isLoading, refetch } = useQuery<Order[]>({
        queryKey: ["admin-orders"],
        queryFn: () => api.get("/api/admin/orders"),
    });

    const handleStatusChange = async (orderId: string, newStatus: string) => {
        try {
            await api.put(`/api/admin/orders/${orderId}`, { status: newStatus });
            refetch();
        } catch (error) {
            alert("Lỗi khi cập nhật trạng thái");
        }
    };

    const filteredOrders = orders?.filter(
        (order) => statusFilter === "all" || order.status === statusFilter
    );

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold mb-2">Quản lý đơn hàng</h1>
                    <p className="text-muted">Tổng số: {orders?.length || 0} đơn hàng</p>
                </div>

                {/* Filters */}
                <div className="card p-4">
                    <div className="flex gap-2 flex-wrap">
                        <button
                            onClick={() => setStatusFilter("all")}
                            className={`px-4 py-2 rounded-xl transition-colors ${statusFilter === "all"
                                    ? "bg-brand text-brand-fg"
                                    : "bg-surface hover:bg-surface-hover"
                                }`}
                        >
                            Tất cả
                        </button>
                        {Object.entries(STATUS_LABELS).map(([status, { label, color }]) => (
                            <button
                                key={status}
                                onClick={() => setStatusFilter(status)}
                                className={`px-4 py-2 rounded-xl transition-colors ${statusFilter === status
                                        ? "bg-brand text-brand-fg"
                                        : "bg-surface hover:bg-surface-hover"
                                    }`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Orders List */}
                <div className="card overflow-hidden">
                    {isLoading ? (
                        <div className="text-center py-20">
                            <div className="animate-spin text-4xl mb-4">⚙️</div>
                            <p className="text-muted">Đang tải...</p>
                        </div>
                    ) : filteredOrders && filteredOrders.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-surface">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">
                                            Mã đơn
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">
                                            Khách hàng
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">
                                            Tổng tiền
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">
                                            Trạng thái
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">
                                            Ngày đặt
                                        </th>
                                        <th className="px-6 py-4 text-right text-sm font-semibold">
                                            Thao tác
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {filteredOrders.map((order) => (
                                        <tr key={order.id} className="hover:bg-surface/50">
                                            <td className="px-6 py-4">
                                                <p className="font-mono text-sm">{order.id}</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div>
                                                    <p className="font-medium">
                                                        {order.customerName}
                                                    </p>
                                                    <p className="text-sm text-muted">
                                                        {order.customerPhone}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="font-semibold">
                                                    {order.total.toLocaleString("vi-VN")}đ
                                                </p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`text-xs px-3 py-1 rounded-full ${STATUS_LABELS[order.status].color
                                                        }`}
                                                >
                                                    {STATUS_LABELS[order.status].label}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-sm">
                                                    {new Date(
                                                        order.createdAt
                                                    ).toLocaleString("vi-VN")}
                                                </p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => setSelectedOrder(order)}
                                                        className="text-sm px-3 py-1 rounded-lg bg-blue-500/10 text-blue-600 hover:bg-blue-500/20"
                                                    >
                                                        👁️ Xem
                                                    </button>
                                                    {order.status !== "completed" &&
                                                        order.status !== "cancelled" && (
                                                            <select
                                                                value={order.status}
                                                                onChange={(e) =>
                                                                    handleStatusChange(
                                                                        order.id,
                                                                        e.target.value
                                                                    )
                                                                }
                                                                className="text-sm px-3 py-1 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-brand"
                                                            >
                                                                {Object.entries(
                                                                    STATUS_LABELS
                                                                ).map(([status, { label }]) => (
                                                                    <option
                                                                        key={status}
                                                                        value={status}
                                                                    >
                                                                        {label}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <p className="text-4xl mb-4">📦</p>
                            <p className="text-muted">Không có đơn hàng</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Order Detail Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="card max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold">Chi tiết đơn hàng</h2>
                                <button
                                    onClick={() => setSelectedOrder(null)}
                                    className="w-8 h-8 rounded-full hover:bg-surface flex items-center justify-center"
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-muted mb-1">Mã đơn hàng</p>
                                    <p className="font-mono">{selectedOrder.id}</p>
                                </div>

                                <div>
                                    <p className="text-sm text-muted mb-1">Khách hàng</p>
                                    <p className="font-medium">{selectedOrder.customerName}</p>
                                    <p className="text-sm">{selectedOrder.customerPhone}</p>
                                    <p className="text-sm">{selectedOrder.customerAddress}</p>
                                </div>

                                <div>
                                    <p className="text-sm text-muted mb-2">Sản phẩm</p>
                                    <div className="space-y-2">
                                        {selectedOrder.items.map((item, idx) => (
                                            <div
                                                key={idx}
                                                className="flex justify-between p-3 bg-surface rounded-lg"
                                            >
                                                <div>
                                                    <p className="font-medium">{item.name}</p>
                                                    <p className="text-sm text-muted">
                                                        Số lượng: {item.quantity}
                                                    </p>
                                                </div>
                                                <p className="font-semibold">
                                                    {item.price.toLocaleString("vi-VN")}đ
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="border-t border-border pt-4">
                                    <div className="flex justify-between text-lg font-bold">
                                        <span>Tổng cộng</span>
                                        <span className="text-brand">
                                            {selectedOrder.total.toLocaleString("vi-VN")}đ
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
