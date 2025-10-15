import { NextRequest, NextResponse } from "next/server";

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    // TODO: Check admin authentication
    const { id } = params;
    const body = await request.json();

    // TODO: Update product in database

    return NextResponse.json({ success: true, id, ...body });
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    // TODO: Check admin authentication
    const { id } = params;

    // TODO: Delete from database

    return NextResponse.json({ success: true, id });
}
