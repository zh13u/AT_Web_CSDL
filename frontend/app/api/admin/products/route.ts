import { NextRequest, NextResponse } from "next/server";
import { MOCK_PRODUCTS } from "@/lib/mockData";

export async function GET(request: NextRequest) {
    // TODO: Check admin authentication

    await new Promise((resolve) => setTimeout(resolve, 300));

    return NextResponse.json(MOCK_PRODUCTS);
}

export async function POST(request: NextRequest) {
    // TODO: Check admin authentication
    const body = await request.json();

    // TODO: Save to database
    const newProduct = {
        id: `product-${Date.now()}`,
        ...body,
        createdAt: new Date().toISOString(),
    };

    return NextResponse.json(newProduct, { status: 201 });
}
