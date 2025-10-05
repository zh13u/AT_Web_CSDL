import { NextRequest, NextResponse } from "next/server";
import { MOCK_PRODUCTS } from "@/lib/mockData";
import { FilterParams, PaginatedResponse, Product } from "@/lib/types";

// Use only real products (30 products)
const ALL_PRODUCTS = MOCK_PRODUCTS;

export async function GET(request: NextRequest) {
    const { searchParams } = request.nextUrl;

    const filters: FilterParams = {
        category: searchParams.get("category") || undefined,
        brand: searchParams.get("brand") || undefined,
        price: searchParams.get("price") || undefined,
        ram: searchParams.get("ram") || undefined,
        rom: searchParams.get("rom") || undefined,
        has5G: searchParams.get("has5G") === "true" || undefined,
        sort: (searchParams.get("sort") as FilterParams["sort"]) || "newest",
        page: parseInt(searchParams.get("page") || "1"),
        pageSize: parseInt(searchParams.get("pageSize") || "24"),
    };

    // Filter products
    let filtered = ALL_PRODUCTS.filter((product) => {
        if (filters.brand && product.brand !== filters.brand) return false;

        if (filters.price) {
            const [min, max] = filters.price.split("-").map((p) => parseInt(p) * 1000000);
            const price = product.salePrice || product.price;
            if (price < min || price > max) return false;
        }

        return true;
    });

    // Sort products
    switch (filters.sort) {
        case "price_asc":
            filtered.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
            break;
        case "price_desc":
            filtered.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
            break;
        case "popular":
            filtered.sort((a, b) => b.ratingCount - a.ratingCount);
            break;
        case "newest":
        default:
            // Already sorted by newest (mock)
            break;
    }

    // Paginate
    const total = filtered.length;
    const page = filters.page || 1;
    const pageSize = filters.pageSize || 24;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const items = filtered.slice(start, end);

    const response: PaginatedResponse<Product> = {
        items,
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
    };

    return NextResponse.json(response);
}
