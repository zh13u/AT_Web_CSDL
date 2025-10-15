"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";

const ADMIN_MENU = [
    { icon: "📊", label: "Dashboard", path: "/admin" },
    { icon: "📱", label: "Sản phẩm", path: "/admin/products" },
    { icon: "📦", label: "Đơn hàng", path: "/admin/orders" },
    { icon: "👥", label: "Người dùng", path: "/admin/users" },
    { icon: "⭐", label: "Đánh giá", path: "/admin/reviews" },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const { user, isLoading } = useAuth();

    // Debug logging
    console.log("AdminLayout - isLoading:", isLoading);
    console.log("AdminLayout - User:", user);
    console.log("AdminLayout - Email:", user?.email);

    // Protect admin routes - Only allow admin@test.com
    useEffect(() => {
        // Don't redirect while loading
        if (isLoading) return;

        // Redirect to login if not authenticated
        if (!user) {
            router.push("/auth/login?redirect=/admin");
        }
    }, [user, isLoading, router]);

    // Loading state - show spinner while checking authentication
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin text-4xl mb-4">⚙️</div>
                    <p className="text-muted">Đang kiểm tra quyền truy cập...</p>
                </div>
            </div>
        );
    }

    // Not logged in - show loading while redirecting
    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin text-4xl mb-4">⚙️</div>
                    <p className="text-muted">Đang chuyển hướng...</p>
                </div>
            </div>
        );
    }

    // Access denied for non-admin users
    if (user.email !== "admin@test.com") {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">🚫</div>
                    <h1 className="text-2xl font-bold mb-2">Truy cập bị từ chối</h1>
                    <p className="text-muted mb-6">
                        Bạn không có quyền truy cập vào trang quản trị.
                    </p>
                    <p className="text-sm text-muted mb-4">
                        Email hiện tại: <span className="font-mono">{user.email}</span>
                    </p>
                    <Link href="/" className="btn-primary">
                        Về trang chủ
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="sticky top-0 z-40 bg-surface border-b border-border">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="text-2xl">🛠️</div>
                        <div>
                            <h1 className="text-xl font-bold">Admin Panel</h1>
                            <p className="text-xs text-muted">Quản lý hệ thống</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="/" className="btn-outline text-sm">
                            🏠 Về trang chủ
                        </Link>
                        <div className="w-10 h-10 rounded-full bg-brand text-brand-fg flex items-center justify-center font-semibold">
                            {user.name?.charAt(0).toUpperCase() || "A"}
                        </div>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-6">
                <div className="flex gap-6">
                    {/* Sidebar */}
                    <aside className="w-64 flex-shrink-0">
                        <nav className="card p-4 sticky top-24">
                            <ul className="space-y-2">
                                {ADMIN_MENU.map((item) => {
                                    const isActive = pathname === item.path;
                                    return (
                                        <li key={item.path}>
                                            <Link
                                                href={item.path}
                                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive
                                                    ? "bg-brand text-brand-fg font-semibold"
                                                    : "hover:bg-surface-hover"
                                                    }`}
                                            >
                                                <span className="text-xl">{item.icon}</span>
                                                <span>{item.label}</span>
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </nav>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1 min-w-0">{children}</main>
                </div>
            </div>
        </div>
    );
}
