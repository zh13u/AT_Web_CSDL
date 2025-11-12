"use client";

import { useQuery } from "@tanstack/react-query";
import { useFilters } from "@/hooks/useFilters";
import { api } from "@/lib/api";
import { PaginatedResponse, Product } from "@/lib/types";
import { ProductCard } from "@/components/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductsPage() {
    const { filters, updateFilters } = useFilters();

    const { data, isLoading } = useQuery<PaginatedResponse<Product>>({
        queryKey: ["products", filters],
        queryFn: () => api.get("/api/products", { params: filters }),
    });

    const brands = ["Apple", "Samsung", "Xiaomi", "OPPO", "Vivo"];
    const priceRanges = [
        { label: "Dưới 5 triệu", value: "0-5" },
        { label: "5-10 triệu", value: "5-10" },
        { label: "10-15 triệu", value: "10-15" },
        { label: "15-20 triệu", value: "15-20" },
        { label: "Trên 20 triệu", value: "20-100" },
    ];

    return (
        <div className="container py-8">
            <h1 className="text-3xl font-bold mb-6">Điện thoại</h1>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Filters Sidebar */}
                <aside className="lg:col-span-1">
                    <div className="card p-4 sticky top-20">
                        <h2 className="font-semibold mb-4">Bộ lọc</h2>

                        {/* Brand Filter */}
                        <div className="mb-6">
                            <h3 className="text-sm font-medium mb-3">Thương hiệu</h3>
                            <div className="space-y-2">
                                {brands.map((brand) => (
                                    <label key={brand} className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={filters.brand === brand}
                                            onChange={(e) =>
                                                updateFilters({ brand: e.target.checked ? brand : undefined })
                                            }
                                            className="rounded"
                                        />
                                        <span className="text-sm">{brand}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Price Filter */}
                        <div className="mb-6">
                            <h3 className="text-sm font-medium mb-3">Giá</h3>
                            <div className="space-y-2">
                                {priceRanges.map((range) => (
                                    <label key={range.value} className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="price"
                                            checked={filters.price === range.value}
                                            onChange={() => updateFilters({ price: range.value })}
                                        />
                                        <span className="text-sm">{range.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={() => updateFilters({ brand: undefined, price: undefined })}
                            className="btn-outline w-full"
                        >
                            Xóa bộ lọc
                        </button>
                    </div>
                </aside>

                {/* Products Grid */}
                <div className="lg:col-span-3">
                    {/* Sort Bar */}
                    <div className="flex items-center justify-between mb-6 p-4 bg-surface rounded-xl border border-border">
                        <span className="text-sm text-muted">
                            {data ? `${data.total} sản phẩm` : "Đang tải..."}
                        </span>
                        <select
                            value={filters.sort || "newest"}
                            onChange={(e) => updateFilters({ sort: e.target.value as any })}
                            className="input w-auto"
                        >
                            <option value="newest">Mới nhất</option>
                            <option value="popular">Bán chạy</option>
                            <option value="price_asc">Giá thấp → cao</option>
                            <option value="price_desc">Giá cao → thấp</option>
                        </select>
                    </div>

                    {/* Products */}
                    {isLoading ? (
                        <div className="grid-products">
                            {Array.from({ length: 12 }).map((_, i) => (
                                <Skeleton key={i} className="h-80" />
                            ))}
                        </div>
                    ) : (
                        <>
                            <div className="grid-products">
                                {data?.items.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>

                            {/* Pagination */}
                            {data && data.totalPages > 1 && (
                                <div className="flex items-center justify-center gap-2 mt-8">
                                    <button
                                        disabled={filters.page === 1}
                                        onClick={() => updateFilters({ page: (filters.page || 1) - 1 })}
                                        className="btn-outline"
                                    >
                                        ← Trước
                                    </button>
                                    <span className="text-sm text-muted">
                                        Trang {filters.page || 1} / {data.totalPages}
                                    </span>
                                    <button
                                        disabled={filters.page === data.totalPages}
                                        onClick={() => updateFilters({ page: (filters.page || 1) + 1 })}
                                        className="btn-outline"
                                    >
                                        Sau →
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
