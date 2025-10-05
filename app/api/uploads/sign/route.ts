import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const body = await request.json();
    const { filename, contentType } = body;

    // Mock pre-signed URL
    const mockUrl = `/api/uploads/mock-${Date.now()}-${filename}`;

    return NextResponse.json({
        url: mockUrl,
        method: "PUT",
        headers: {
            "Content-Type": contentType,
        },
    });
}
