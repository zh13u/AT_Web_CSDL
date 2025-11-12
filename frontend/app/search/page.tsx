"use client";

import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Product } from "@/lib/types";
import { ProductCard } from "@/components/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";

export default function SearchPage() {
    const searchParams = useSearchParams();
    const query = searchParams.get("q") || "";

    const { data, isLoading } = useQuery<{ items: Product[] }>({
        queryKey: ["search", query],
        queryFn: () => api.get("/api/search", { params: { q: query } }),
        enabled: !!query,
    });

    if (!query) {
        return (
            <div className="container py-16 text-center">
                <h1 className="text-2xl font-bold mb-4">Vui lòng nhập từ khóa tìm kiếm</h1>
            </div>
        );
    }

    return (
        <div className="container py-8">
            <h1 className="text-2xl font-bold mb-6">
                Kết quả tìm kiếm cho: &quot;{query}&quot;
            </h1>

            {isLoading ? (
                <div className="grid-products">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <Skeleton key={i} className="h-80" />
                    ))}
                </div>
            ) : data?.items.length === 0 ? (
                <div className="text-center py-16">
                    <p className="text-muted mb-4">Không tìm thấy sản phẩm nào</p>
                    <a href="/dien-thoai" className="btn-primary">
                        Xem tất cả sản phẩm
                    </a>
                </div>
            ) : (
                <div className="grid-products">
                    {data?.items.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
}
