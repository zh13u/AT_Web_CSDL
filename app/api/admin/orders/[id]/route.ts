import { NextRequest, NextResponse } from "next/server";

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    // TODO: Check admin authentication
    const { id } = params;
    const body = await request.json();

    // TODO: Update order status in database

    return NextResponse.json({ success: true, id, ...body });
}
