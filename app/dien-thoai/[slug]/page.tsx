"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { api } from "@/lib/api";
import { ProductDetail } from "@/lib/types";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { RatingStars } from "@/components/RatingStars";
import { Skeleton } from "@/components/ui/skeleton";
import { useCartStore } from "@/store/cart";
import { useUIStore } from "@/store/ui";
import { useAuth } from "@/hooks/useAuth";
import { AuthDialog } from "@/components/AuthDialog";
import { ProductReviews } from "@/components/ProductReviews";

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
    const { slug } = params;
    const [quantity, setQuantity] = useState(1);
    const [showAuthDialog, setShowAuthDialog] = useState(false);
    const { addItem, setOpen } = useCartStore();
    const { addToast } = useUIStore();
    const { user } = useAuth();

    const { data: product, isLoading } = useQuery<ProductDetail>({
        queryKey: ["product", slug],
        queryFn: () => api.get(`/api/products/${slug}`),
    });

    if (isLoading) {
        return (
            <div className="container py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <Skeleton className="h-96" />
                    <Skeleton className="h-96" />
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="container py-16 text-center">
                <h1 className="text-2xl font-bold mb-4">Không tìm thấy sản phẩm</h1>
                <a href="/dien-thoai" className="btn-primary">
                    Về trang danh sách
                </a>
            </div>
        );
    }

    const displayPrice = product.salePrice || product.price;
    const maxStock = product.variants?.length > 0 ? product.variants[0].stock : 50;

    const handleAddToCart = () => {
        if (!user) {
            setShowAuthDialog(true);
            return;
        }

        addItem({
            productId: product.id,
            name: product.name,
            thumbnail: product.thumbnail,
            variant: product.variants?.length > 0 ? {
                color: product.variants[0].color,
                storage: product.variants[0].storage,
                sku: product.variants[0].sku,
            } : {
                color: "Mặc định",
                storage: product.specs.rom,
                sku: product.slug,
            },
            price: displayPrice,
            quantity,
        });
        addToast("success", "Đã thêm vào giỏ hàng");
        setOpen(true);
    };

    return (
        <div className="container py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {/* Gallery */}
                <div>
                    <div className="aspect-square rounded-2xl bg-surface border border-border overflow-hidden mb-4">
                        <Image
                            src={product.gallery[0]}
                            alt={product.name}
                            width={600}
                            height={600}
                            className="w-full h-full object-contain p-8"
                        />
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                        {product.gallery.slice(1, 5).map((img, i) => (
                            <div
                                key={i}
                                className="aspect-square rounded-lg bg-surface border border-border overflow-hidden cursor-pointer hover:border-brand"
                            >
                                <Image src={img} alt="" width={150} height={150} className="object-contain p-2" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Info */}
                <div>
                    <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

                    <div className="flex items-center gap-4 mb-6">
                        <RatingStars rating={product.rating} size="md" showNumber />
                        <span className="text-sm text-muted">({product.ratingCount} đánh giá)</span>
                    </div>

                    <div className="mb-6">
                        <div className="price text-3xl mb-2">
                            <span className="sale">{formatPrice(displayPrice)}</span>
                            {product.salePrice && <span className="strike">{formatPrice(product.price)}</span>}
                        </div>
                        {product.salePrice && (
                            <span className="text-sm text-danger">
                                Tiết kiệm {formatPrice(product.price - product.salePrice)}
                            </span>
                        )}
                    </div>

                    {/* Quantity */}
                    <div className="mb-6">
                        <h3 className="font-medium mb-3">Số lượng:</h3>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="w-10 h-10 rounded-lg border border-border hover:bg-border"
                            >
                                -
                            </button>
                            <span className="w-12 text-center font-medium">{quantity}</span>
                            <button
                                onClick={() => setQuantity(Math.min(maxStock, quantity + 1))}
                                className="w-10 h-10 rounded-lg border border-border hover:bg-border"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 mb-6">
                        <button onClick={handleAddToCart} className="btn-outline flex-1">
                            Thêm vào giỏ
                        </button>
                        <button onClick={handleAddToCart} className="btn-primary flex-1">
                            Mua ngay
                        </button>
                    </div>

                    {/* Specs */}
                    <div className="card p-4">
                        <h3 className="font-semibold mb-3">Thông số kỹ thuật</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted">Chipset:</span>
                                <span>{product.specs.chipset}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted">RAM:</span>
                                <span>{product.specs.ram}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted">ROM:</span>
                                <span>{product.specs.rom}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted">Màn hình:</span>
                                <span>{product.specs.display.size}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted">Pin:</span>
                                <span>{product.specs.battery}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Description */}
            {product.descriptionHTMLSafe && (
                <div className="card p-6 mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Mô tả sản phẩm</h2>
                    <div
                        className="prose max-w-none"
                        dangerouslySetInnerHTML={{ __html: product.descriptionHTMLSafe }}
                    />
                </div>
            )}

            {/* Reviews */}
            <ProductReviews productSlug={slug} productId={product.id} />

            <AuthDialog
                isOpen={showAuthDialog}
                onClose={() => setShowAuthDialog(false)}
                redirectUrl={`/dien-thoai/${slug}`}
            />
        </div>
    );
}
