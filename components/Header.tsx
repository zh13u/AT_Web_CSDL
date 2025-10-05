"use client";

import Link from "next/link";
import { Search, ShoppingCart, Menu, User } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { useUIStore } from "@/store/ui";
import { useAuth } from "@/hooks/useAuth";
import { CartDrawer } from "./CartDrawer";
import { SearchBox } from "./SearchBox";

export function Header() {
    const { getTotalItems, setOpen } = useCartStore();
    const { setMobileMenuOpen } = useUIStore();
    const { user, isAuthenticated } = useAuth();

    return (
        <>
            <header className="sticky top-0 z-40 w-full bg-surface border-b border-border shadow-sm">
                <div className="container">
                    <div className="flex h-16 items-center justify-between gap-4">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-brand">
                            <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
                            </svg>
                            <span className="hidden sm:inline">PhoneShop</span>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center gap-6">
                            <Link href="/dien-thoai" className="text-sm font-medium hover:text-brand">
                                Điện thoại
                            </Link>
                            <Link href="/chinh-sach-bao-hanh" className="text-sm font-medium hover:text-brand">
                                Bảo hành
                            </Link>
                            <Link href="/chinh-sach-doi-tra" className="text-sm font-medium hover:text-brand">
                                Đổi trả
                            </Link>
                            <Link href="/lien-he" className="text-sm font-medium hover:text-brand">
                                Liên hệ
                            </Link>
                        </nav>

                        {/* Search */}
                        <div className="flex-1 max-w-md hidden lg:block">
                            <SearchBox />
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                            {/* Mobile Search */}
                            <button
                                className="lg:hidden p-2 hover:bg-border rounded-lg"
                                aria-label="Search"
                            >
                                <Search className="h-5 w-5" />
                            </button>

                            {/* User */}
                            {isAuthenticated ? (
                                <Link href="/account" className="p-2 hover:bg-border rounded-lg">
                                    <User className="h-5 w-5" />
                                </Link>
                            ) : (
                                <Link
                                    href="/auth/login"
                                    className="hidden sm:inline-flex btn-outline"
                                >
                                    Đăng nhập
                                </Link>
                            )}

                            {/* Cart */}
                            <button
                                onClick={() => setOpen(true)}
                                className="relative p-2 hover:bg-border rounded-lg"
                                aria-label="Cart"
                            >
                                <ShoppingCart className="h-5 w-5" />
                                {getTotalItems() > 0 && (
                                    <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full bg-danger text-white text-xs font-medium">
                                        {getTotalItems()}
                                    </span>
                                )}
                            </button>

                            {/* Mobile Menu */}
                            <button
                                onClick={() => setMobileMenuOpen(true)}
                                className="md:hidden p-2 hover:bg-border rounded-lg"
                                aria-label="Menu"
                            >
                                <Menu className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <CartDrawer />
        </>
    );
}
