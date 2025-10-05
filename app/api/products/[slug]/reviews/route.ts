import { NextRequest, NextResponse } from "next/server";
import { MOCK_REVIEWS } from "@/lib/mockData";

export async function GET(
    request: NextRequest,
    { params }: { params: { slug: string } }
) {
    const { slug } = params;
    const { searchParams } = request.nextUrl;
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = 10;

    const reviews = MOCK_REVIEWS[slug] || [];
    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    return NextResponse.json({
        items: reviews.slice(start, end),
        total: reviews.length,
        page,
        pageSize,
        totalPages: Math.ceil(reviews.length / pageSize),
    });
}

export async function POST(
    request: NextRequest,
    { params }: { params: { slug: string } }
) {
    const { slug } = params;
    const body = await request.json();
    const { rating, content } = body;

    // Mock: Create review
    const review = {
        id: "review-" + Date.now(),
        user: { name: "Người dùng", verifiedPurchase: false },
        rating,
        content,
        createdAt: new Date().toISOString(),
    };

    // In real app, save to database
    return NextResponse.json(review, { status: 201 });
}
