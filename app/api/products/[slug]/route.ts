import { NextRequest, NextResponse } from "next/server";
import { MOCK_PRODUCT_DETAILS } from "@/lib/mockData";

export async function GET(
    request: NextRequest,
    { params }: { params: { slug: string } }
) {
    const { slug } = params;

    const product = MOCK_PRODUCT_DETAILS[slug];

    if (!product) {
        return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    return NextResponse.json(product);
}
