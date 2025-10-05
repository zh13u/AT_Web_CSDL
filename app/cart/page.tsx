"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cart";
import { useAuth } from "@/hooks/useAuth";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { AuthDialog } from "@/components/AuthDialog";
import { useRouter } from "next/navigation";

export default function CartPage() {
    const router = useRouter();
    const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCartStore();
    const { user } = useAuth();
    const [showAuthDialog, setShowAuthDialog] = useState(false);

    const handleCheckout = () => {
        if (!user) {
            setShowAuthDialog(true);
            return;
        }
        router.push("/checkout");
    };

    if (items.length === 0) {
        return (
            <div className="container py-16 text-center">
                <h1 className="text-2xl font-bold mb-4">Giỏ hàng trống</h1>
                <p className="text-muted mb-6">Bạn chưa có sản phẩm nào trong giỏ hàng</p>
                <Link href="/dien-thoai" className="btn-primary">
                    Mua sắm ngay
                </Link>
            </div>
        );
    }

    return (
        <div className="container py-8">
            <h1 className="text-3xl font-bold mb-8">Giỏ hàng của bạn</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                    {items.map((item) => (
                        <div key={item.variant.sku} className="card p-4 flex gap-4">
                            <div className="relative w-24 h-24 flex-shrink-0 rounded-lg bg-surface overflow-hidden">
                                <Image src={item.thumbnail} alt={item.name} fill className="object-contain" />
                            </div>

                            <div className="flex-1 min-w-0">
                                <h3 className="font-medium line-clamp-2 mb-1">{item.name}</h3>
                                <p className="text-sm text-muted mb-2">
                                    {item.variant.color} - {item.variant.storage}
                                </p>
                                <p className="text-lg font-semibold text-danger">{formatPrice(item.price)}</p>
                            </div>

                            <div className="flex flex-col items-end justify-between">
                                <button
                                    onClick={() => removeItem(item.variant.sku)}
                                    className="p-2 hover:bg-border rounded-lg"
                                    aria-label="Xóa"
                                >
                                    <Trash2 className="h-5 w-5 text-muted" />
                                </button>

                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => updateQuantity(item.variant.sku, Math.max(1, item.quantity - 1))}
                                        className="w-8 h-8 flex items-center justify-center rounded border border-border hover:bg-border"
                                        disabled={item.quantity <= 1}
                                    >
                                        -
                                    </button>
                                    <span className="w-10 text-center">{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item.variant.sku, item.quantity + 1)}
                                        className="w-8 h-8 flex items-center justify-center rounded border border-border hover:bg-border"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    <button onClick={clearCart} className="btn-outline">
                        Xóa tất cả
                    </button>
                </div>

                {/* Summary */}
                <div className="lg:col-span-1">
                    <div className="card p-6 sticky top-20">
                        <h2 className="text-xl font-semibold mb-4">Tổng đơn hàng</h2>

                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted">Tạm tính:</span>
                                <span>{formatPrice(getTotalPrice())}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted">Phí vận chuyển:</span>
                                <span>Miễn phí</span>
                            </div>
                            <div className="border-t border-border pt-3 flex justify-between font-semibold text-lg">
                                <span>Tổng cộng:</span>
                                <span className="text-danger">{formatPrice(getTotalPrice())}</span>
                            </div>
                        </div>

                        <button
                            onClick={handleCheckout}
                            className="btn-primary w-full justify-center"
                        >
                            Thanh toán
                        </button>

                        <Link
                            href="/dien-thoai"
                            className="btn-outline w-full justify-center mt-3"
                        >
                            Tiếp tục mua sắm
                        </Link>
                    </div>
                </div>
            </div>

            <AuthDialog
                isOpen={showAuthDialog}
                onClose={() => setShowAuthDialog(false)}
                redirectUrl="/cart"
            />
        </div>
    );
}
