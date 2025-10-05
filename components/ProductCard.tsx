"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { Heart } from "lucide-react";

type ProductCardProps = {
    product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
    const displayPrice = product.salePrice || product.price;
    const hasDiscount = !!product.salePrice;
    const discountPercent = hasDiscount
        ? Math.round((1 - displayPrice / product.price) * 100)
        : 0;

    return (
        <div className="relative rounded-2xl border-2 border-danger overflow-hidden bg-white group hover:shadow-xl transition-all duration-300">
            {/* Discount Badge - Top Left */}
            {hasDiscount && (
                <div className="absolute top-0 left-0 z-10">
                    <div className="bg-danger text-white text-xs font-bold px-3 py-1 rounded-br-xl">
                        Giảm {discountPercent}%
                    </div>
                </div>
            )}

            {/* Installment Badge - Top Right */}
            <div className="absolute top-2 right-2 z-10">
                <div className="bg-blue-100 text-blue-600 text-xs font-medium px-2 py-1 rounded-md">
                    Trả góp 0%
                </div>
            </div>

            {/* Hot/New Badges - Below discount */}
            {(product.isHot || product.isNew) && (
                <div className="absolute top-8 left-0 flex flex-col gap-1 z-10">
                    {product.isHot && (
                        <span className="bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-r-md">
                            Hot
                        </span>
                    )}
                    {product.isNew && (
                        <span className="bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-r-md">
                            Mới
                        </span>
                    )}
                </div>
            )}

            <Link href={`/dien-thoai/${product.slug}`} className="block">
                {/* Thumbnail */}
                <div className="aspect-[4/3] relative bg-white p-4">
                    <Image
                        src={product.thumbnail}
                        alt={product.name}
                        fill
                        className="object-contain"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                </div>

                {/* Info */}
                <div className="p-3 pt-2">
                    {/* Product Name */}
                    <h3 className="text-sm font-medium line-clamp-2 mb-2 min-h-[2.5rem] group-hover:text-brand transition-colors">
                        {product.name}
                    </h3>

                    {/* Price */}
                    <div className="mb-2">
                        <div className="text-danger text-lg font-bold">
                            {formatPrice(displayPrice)}
                        </div>
                        {hasDiscount && (
                            <div className="text-gray-400 text-sm line-through">
                                {formatPrice(product.price)}
                            </div>
                        )}
                    </div>

                    {/* Rating & Favorite */}
                    <div className="flex items-center justify-between">
                        {/* Rating */}
                        <div className="flex items-center gap-1">
                            <span className="text-yellow-500 text-lg">⭐</span>
                            <span className="font-semibold text-sm">{product.rating}</span>
                        </div>

                        {/* Favorite Button */}
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                // TODO: Add to wishlist
                            }}
                            className="flex items-center gap-1 text-blue-500 hover:text-blue-600 transition-colors"
                            aria-label="Yêu thích"
                        >
                            <Heart className="w-4 h-4" />
                            <span className="text-xs font-medium">Yêu thích</span>
                        </button>
                    </div>
                </div>
            </Link>
        </div>
    );
}
