import { NextRequest, NextResponse } from "next/server";
import { MOCK_PRODUCTS } from "@/lib/mockData";

const ALL_PRODUCTS = MOCK_PRODUCTS;

export async function GET(request: NextRequest) {
    const { searchParams } = request.nextUrl;
    const query = searchParams.get("q") || "";

    if (!query) {
        return NextResponse.json({ items: [] });
    }

    // Simple search by name
    const results = ALL_PRODUCTS.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 10); // Limit to 10 results

    return NextResponse.json({ items: results });
}
