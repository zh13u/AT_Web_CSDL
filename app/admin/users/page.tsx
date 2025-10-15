"use client";

import { AdminLayout } from "@/components/AdminLayout";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useState } from "react";

interface User {
    id: string;
    name: string;
    email: string;
    phone?: string;
    createdAt: string;
    isBlocked: boolean;
    totalOrders: number;
    totalSpent: number;
}

export default function AdminUsers() {
    const [searchQuery, setSearchQuery] = useState("");

    const { data: users, isLoading, refetch } = useQuery<User[]>({
        queryKey: ["admin-users"],
        queryFn: () => api.get("/api/admin/users"),
    });

    const handleToggleBlock = async (userId: string, currentStatus: boolean) => {
        if (!confirm(`Bạn có chắc muốn ${currentStatus ? "mở khóa" : "khóa"} người dùng này?`))
            return;

        try {
            await api.put(`/api/admin/users/${userId}`, { isBlocked: !currentStatus });
            refetch();
        } catch (error) {
            alert("Lỗi khi cập nhật trạng thái");
        }
    };

    const filteredUsers = users?.filter(
        (user) =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.phone?.includes(searchQuery)
    );

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold mb-2">Quản lý người dùng</h1>
                    <p className="text-muted">Tổng số: {users?.length || 0} người dùng</p>
                </div>

                {/* Search */}
                <div className="card p-4">
                    <input
                        type="text"
                        placeholder="🔍 Tìm kiếm theo tên, email, số điện thoại..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-2 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-brand"
                    />
                </div>

                {/* Users Table */}
                <div className="card overflow-hidden">
                    {isLoading ? (
                        <div className="text-center py-20">
                            <div className="animate-spin text-4xl mb-4">⚙️</div>
                            <p className="text-muted">Đang tải...</p>
                        </div>
                    ) : filteredUsers && filteredUsers.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-surface">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">
                                            Người dùng
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">
                                            Liên hệ
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">
                                            Đơn hàng
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">
                                            Tổng chi tiêu
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">
                                            Ngày tham gia
                                        </th>
                                        <th className="px-6 py-4 text-right text-sm font-semibold">
                                            Thao tác
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {filteredUsers.map((user) => (
                                        <tr
                                            key={user.id}
                                            className={`hover:bg-surface/50 ${user.isBlocked ? "opacity-50" : ""
                                                }`}
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-brand text-brand-fg flex items-center justify-center font-semibold">
                                                        {user.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium">{user.name}</p>
                                                        {user.isBlocked && (
                                                            <span className="text-xs text-error">
                                                                🚫 Đã khóa
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div>
                                                    <p className="text-sm">{user.email}</p>
                                                    {user.phone && (
                                                        <p className="text-sm text-muted">
                                                            {user.phone}
                                                        </p>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="font-semibold">{user.totalOrders}</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="font-semibold">
                                                    {user.totalSpent.toLocaleString("vi-VN")}đ
                                                </p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-sm">
                                                    {new Date(user.createdAt).toLocaleDateString(
                                                        "vi-VN"
                                                    )}
                                                </p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() =>
                                                            handleToggleBlock(
                                                                user.id,
                                                                user.isBlocked
                                                            )
                                                        }
                                                        className={`text-sm px-3 py-1 rounded-lg ${user.isBlocked
                                                                ? "bg-success/10 text-success hover:bg-success/20"
                                                                : "bg-error/10 text-error hover:bg-error/20"
                                                            }`}
                                                    >
                                                        {user.isBlocked ? "✅ Mở khóa" : "🚫 Khóa"}
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
                            <p className="text-4xl mb-4">👥</p>
                            <p className="text-muted">Không tìm thấy người dùng</p>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
