"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import { api } from "@/lib/api";
import { Product } from "@/lib/types";
import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";

export function SearchBox() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Product[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const debounce = useDebounce(300);
    const router = useRouter();
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSearch = (value: string) => {
        setQuery(value);
        if (!value.trim()) {
            setResults([]);
            setIsOpen(false);
            return;
        }

        setIsLoading(true);
        debounce(async () => {
            try {
                const data = await api.get<{ items: Product[] }>("/api/search", {
                    params: { q: value },
                });
                setResults(data.items);
                setIsOpen(true);
            } catch (error) {
                console.error("Search error:", error);
            } finally {
                setIsLoading(false);
            }
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query)}`);
            setIsOpen(false);
        }
    };

    return (
        <div ref={wrapperRef} className="relative">
            <form onSubmit={handleSubmit} className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                <input
                    type="text"
                    placeholder="Tìm kiếm điện thoại..."
                    value={query}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="input pl-10 pr-10"
                />
                {query && (
                    <button
                        type="button"
                        onClick={() => {
                            setQuery("");
                            setResults([]);
                            setIsOpen(false);
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                        <X className="h-4 w-4 text-muted" />
                    </button>
                )}
            </form>

            {/* Search Results Dropdown */}
            {isOpen && results.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-surface border border-border rounded-2xl shadow-soft max-h-[400px] overflow-auto z-50">
                    {results.map((product) => (
                        <Link
                            key={product.id}
                            href={`/dien-thoai/${product.slug}`}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 p-3 hover:bg-border transition-colors"
                        >
                            <div className="relative w-12 h-12 flex-shrink-0 rounded-lg bg-border overflow-hidden">
                                <Image
                                    src={product.thumbnail}
                                    alt={product.name}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium line-clamp-1">{product.name}</p>
                                <p className="text-sm text-danger font-semibold">
                                    {formatPrice(product.salePrice || product.price)}
                                </p>
                            </div>
                        </Link>
                    ))}
                    <div className="p-3 border-t border-border">
                        <button
                            onClick={handleSubmit}
                            className="w-full text-center text-sm text-brand hover:underline"
                        >
                            Xem tất cả kết quả
                        </button>
                    </div>
                </div>
            )}

            {isLoading && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-surface border border-border rounded-2xl p-4 text-center text-sm text-muted">
                    Đang tìm kiếm...
                </div>
            )}
        </div>
    );
}
