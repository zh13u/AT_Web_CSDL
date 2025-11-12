"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useCartStore } from "@/store/cart";
import { User, ShoppingBag, MapPin, Heart, LogOut } from "lucide-react";

const MENU_ITEMS = [
    { href: "/account", icon: User, label: "Thông tin cá nhân", type: "link" as const },
    { action: "cart", icon: ShoppingBag, label: "Đơn hàng của tôi", type: "action" as const },
    { href: "/dia-chi", icon: MapPin, label: "Địa chỉ nhận hàng", type: "link" as const },
    { href: "/yeu-thich", icon: Heart, label: "Sản phẩm yêu thích", type: "link" as const },
];

export function AccountLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const { user, logout } = useAuth();
    const { setOpen: setCartOpen } = useCartStore();

    const handleLogout = () => {
        logout();
        router.push("/");
    };

    const handleItemClick = (item: typeof MENU_ITEMS[number]) => {
        if (item.type === "action" && item.action === "cart") {
            setCartOpen(true);
        }
    };

    if (!user) return null;

    return (
        <div className="container py-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Sidebar */}
                <div className="lg:col-span-1">
                    <div className="card p-6 space-y-4">
                        <div className="flex items-center gap-3 pb-4 border-b border-border">
                            <div className="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center">
                                <User className="h-6 w-6 text-brand" />
                            </div>
                            <div>
                                <p className="font-semibold">{user.name}</p>
                                <p className="text-sm text-muted">{user.email}</p>
                            </div>
                        </div>

                        <nav className="space-y-1">
                            {MENU_ITEMS.map((item, index) => {
                                const Icon = item.icon;
                                const isActive = item.type === "link" && pathname === item.href;

                                if (item.type === "action") {
                                    return (
                                        <button
                                            key={index}
                                            onClick={() => handleItemClick(item)}
                                            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-border transition-colors"
                                        >
                                            <Icon className="h-5 w-5" />
                                            <span>{item.label}</span>
                                        </button>
                                    );
                                }

                                return (
                                    <Link
                                        key={item.href!}
                                        href={item.href!}
                                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive
                                                ? "bg-brand/10 text-brand font-medium"
                                                : "hover:bg-border"
                                            }`}
                                    >
                                        <Icon className="h-5 w-5" />
                                        <span>{item.label}</span>
                                    </Link>
                                );
                            })}
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-danger/10 text-danger transition-colors"
                            >
                                <LogOut className="h-5 w-5" />
                                <span>Đăng xuất</span>
                            </button>
                        </nav>
                    </div>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-3">{children}</div>
            </div>
        </div>
    );
}
