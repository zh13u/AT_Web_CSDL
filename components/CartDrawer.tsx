"use client";

import { X, ShoppingCart, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/utils";

export function CartDrawer() {
    const { items, isOpen, setOpen, removeItem, updateQuantity, getTotalPrice } = useCartStore();

    if (!isOpen) return null;

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black/50 z-50"
                onClick={() => setOpen(false)}
                aria-hidden="true"
            />

            {/* Drawer */}
            <div className="drawer z-50 animate-in slide-in-from-right">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-border">
                    <div className="flex items-center gap-2">
                        <ShoppingCart className="h-5 w-5" />
                        <h2 className="text-lg font-semibold">Giỏ hàng ({items.length})</h2>
                    </div>
                    <button
                        onClick={() => setOpen(false)}
                        className="p-2 hover:bg-border rounded-lg"
                        aria-label="Close cart"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Content */}
                {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                        <ShoppingCart className="h-16 w-16 text-muted mb-4" />
                        <p className="text-muted mb-4">Giỏ hàng của bạn đang trống</p>
                        <Link href="/dien-thoai" onClick={() => setOpen(false)} className="btn-primary">
                            Mua sắm ngay
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="flex-1 overflow-auto p-4 space-y-4">
                            {items.map((item) => (
                                <div
                                    key={item.variant.sku}
                                    className="flex gap-3 p-3 bg-bg rounded-xl border border-border"
                                >
                                    <div className="relative w-20 h-20 flex-shrink-0 rounded-lg bg-surface overflow-hidden">
                                        <Image
                                            src={item.thumbnail}
                                            alt={item.name}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-sm font-medium line-clamp-2">{item.name}</h3>
                                        <p className="text-xs text-muted mt-1">
                                            {item.variant.color} - {item.variant.storage}
                                        </p>
                                        <div className="flex items-center justify-between mt-2">
                                            <span className="text-sm font-semibold text-danger">
                                                {formatPrice(item.price)}
                                            </span>
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() =>
                                                        updateQuantity(item.variant.sku, Math.max(1, item.quantity - 1))
                                                    }
                                                    className="w-6 h-6 flex items-center justify-center rounded border border-border hover:bg-border"
                                                    disabled={item.quantity <= 1}
                                                >
                                                    -
                                                </button>
                                                <span className="text-sm w-8 text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.variant.sku, item.quantity + 1)}
                                                    className="w-6 h-6 flex items-center justify-center rounded border border-border hover:bg-border"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => removeItem(item.variant.sku)}
                                        className="p-1 hover:bg-border rounded"
                                        aria-label="Remove item"
                                    >
                                        <Trash2 className="h-4 w-4 text-muted" />
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Footer */}
                        <div className="border-t border-border p-4 space-y-3">
                            <div className="flex items-center justify-between text-lg font-semibold">
                                <span>Tổng cộng:</span>
                                <span className="text-danger">{formatPrice(getTotalPrice())}</span>
                            </div>
                            <Link
                                href="/checkout"
                                onClick={() => setOpen(false)}
                                className="btn-primary w-full justify-center"
                            >
                                Thanh toán
                            </Link>
                            <Link
                                href="/cart"
                                onClick={() => setOpen(false)}
                                className="btn-outline w-full justify-center"
                            >
                                Xem giỏ hàng
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
