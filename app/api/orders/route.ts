import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const body = await request.json();

    // Mock order creation
    const order = {
        id: "order-" + Date.now(),
        ...body,
        status: "pending",
        createdAt: new Date().toISOString(),
    };

    // In real app, save to database
    return NextResponse.json(order, { status: 201 });
}

export async function GET(request: NextRequest) {
    // Mock: Return empty orders
    return NextResponse.json({ items: [], total: 0 });
}
