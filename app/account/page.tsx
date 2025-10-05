"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Skeleton } from "@/components/ui/skeleton";
import { AccountLayout } from "@/components/AccountLayout";

export default function AccountPage() {
    const router = useRouter();
    const { user, isLoading, isAuthenticated } = useAuth();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push("/auth/login?redirect=/account");
        }
    }, [isLoading, isAuthenticated, router]);

    if (isLoading) {
        return (
            <div className="container py-8">
                <Skeleton className="h-96" />
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <AccountLayout>
            <h1 className="text-2xl font-bold mb-6">Thông tin cá nhân</h1>

            <div className="card p-6">
                <h2 className="text-lg font-semibold mb-6">Thông tin cá nhân</h2>

                <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Họ và tên</label>
                            <input
                                type="text"
                                defaultValue={user.name}
                                className="w-full px-4 py-2 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-brand"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Email</label>
                            <input
                                type="email"
                                defaultValue={user.email}
                                disabled
                                className="w-full px-4 py-2 rounded-xl border border-border bg-border/50 cursor-not-allowed"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Số điện thoại</label>
                            <input
                                type="tel"
                                defaultValue={user.phone || ""}
                                placeholder="0912345678"
                                className="w-full px-4 py-2 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-brand"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Giới tính</label>
                            <select className="w-full px-4 py-2 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-brand">
                                <option value="">Chọn giới tính</option>
                                <option value="male">Nam</option>
                                <option value="female">Nữ</option>
                                <option value="other">Khác</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Ngày sinh</label>
                        <input
                            type="date"
                            className="w-full px-4 py-2 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-brand"
                        />
                    </div>

                    <div className="flex gap-3">
                        <button type="submit" className="btn-primary">
                            Lưu thay đổi
                        </button>
                        <button type="button" className="btn-outline">
                            Hủy
                        </button>
                    </div>
                </form>

                <hr className="my-8 border-border" />

                <h2 className="text-lg font-semibold mb-6">Đổi mật khẩu</h2>
                <form className="space-y-4 max-w-md">
                    <div>
                        <label className="block text-sm font-medium mb-2">Mật khẩu hiện tại</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-brand"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Mật khẩu mới</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-brand"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Xác nhận mật khẩu mới</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-brand"
                        />
                    </div>
                    <button type="submit" className="btn-primary">
                        Cập nhật mật khẩu
                    </button>
                </form>
            </div>
        </AccountLayout>
    );
}
