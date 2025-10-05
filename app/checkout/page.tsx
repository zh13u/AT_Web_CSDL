"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useCartStore } from "@/store/cart";
import { Skeleton } from "@/components/ui/skeleton";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";

export default function CheckoutPage() {
    const router = useRouter();
    const { user, isLoading: authLoading } = useAuth();
    const { items, getTotalPrice } = useCartStore();

    useEffect(() => {
        if (!authLoading && !user) {
            router.push("/auth/login?redirect=/checkout");
        }
    }, [user, authLoading, router]);

    if (authLoading) {
        return (
            <div className="container py-8">
                <Skeleton className="h-96" />
            </div>
        );
    }

    if (!user) {
        return null;
    }

    if (items.length === 0) {
        return (
            <div className="container py-16 text-center">
                <h1 className="text-2xl font-bold mb-4">Giỏ hàng trống</h1>
                <p className="text-muted mb-6">Bạn chưa có sản phẩm nào trong giỏ hàng</p>
                <a href="/dien-thoai" className="btn-primary">
                    Tiếp tục mua sắm
                </a>
            </div>
        );
    }

    return (
        <div className="container py-8">
            <h1 className="text-2xl font-bold mb-6">Thanh toán</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Thông tin giao hàng */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="card p-6">
                        <h2 className="text-lg font-semibold mb-4">Thông tin giao hàng</h2>
                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Họ và tên</label>
                                <input
                                    type="text"
                                    defaultValue={user.name}
                                    className="w-full px-4 py-2 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-brand"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Email</label>
                                    <input
                                        type="email"
                                        defaultValue={user.email}
                                        className="w-full px-4 py-2 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-brand"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Số điện thoại</label>
                                    <input
                                        type="tel"
                                        placeholder="0912345678"
                                        className="w-full px-4 py-2 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-brand"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Địa chỉ giao hàng</label>
                                <textarea
                                    rows={3}
                                    placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố"
                                    className="w-full px-4 py-2 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-brand"
                                ></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Ghi chú (tùy chọn)</label>
                                <textarea
                                    rows={2}
                                    placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn"
                                    className="w-full px-4 py-2 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-brand"
                                ></textarea>
                            </div>
                        </form>
                    </div>

                    <div className="card p-6">
                        <h2 className="text-lg font-semibold mb-4">Phương thức thanh toán</h2>
                        <div className="space-y-3">
                            <label className="flex items-center gap-3 p-4 border border-border rounded-xl cursor-pointer hover:border-brand">
                                <input type="radio" name="payment" defaultChecked className="w-4 h-4" />
                                <span>Thanh toán khi nhận hàng (COD)</span>
                            </label>
                            <label className="flex items-center gap-3 p-4 border border-border rounded-xl cursor-pointer hover:border-brand">
                                <input type="radio" name="payment" className="w-4 h-4" />
                                <span>Chuyển khoản ngân hàng</span>
                            </label>
                            <label className="flex items-center gap-3 p-4 border border-border rounded-xl cursor-pointer hover:border-brand">
                                <input type="radio" name="payment" className="w-4 h-4" />
                                <span>Ví điện tử (MoMo, ZaloPay)</span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Tóm tắt đơn hàng */}
                <div>
                    <div className="card p-6 sticky top-4">
                        <h2 className="text-lg font-semibold mb-4">Đơn hàng của bạn</h2>

                        <div className="space-y-4 mb-4">
                            {items.map((item) => (
                                <div key={item.sku} className="flex gap-3">
                                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-border flex-shrink-0">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            width={64}
                                            height={64}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium truncate">{item.name}</p>
                                        <p className="text-xs text-muted">
                                            {item.variant.color} - {item.variant.storage}
                                        </p>
                                        <p className="text-sm">
                                            <span className="font-semibold">{formatPrice(item.price)}</span>
                                            <span className="text-muted"> x {item.quantity}</span>
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-border pt-4 space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted">Tạm tính</span>
                                <span>{formatPrice(getTotalPrice())}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted">Phí vận chuyển</span>
                                <span>Miễn phí</span>
                            </div>
                            <div className="flex justify-between text-lg font-bold pt-2 border-t border-border">
                                <span>Tổng cộng</span>
                                <span className="text-danger">{formatPrice(getTotalPrice())}</span>
                            </div>
                        </div>

                        <button className="btn-primary w-full mt-6">
                            Đặt hàng
                        </button>

                        <p className="text-xs text-muted text-center mt-4">
                            Bằng cách đặt hàng, bạn đồng ý với{" "}
                            <a href="/chinh-sach-bao-mat" className="text-brand hover:underline">
                                Chính sách bảo mật
                            </a>{" "}
                            của chúng tôi
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
