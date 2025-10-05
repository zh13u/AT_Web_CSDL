import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const session = request.cookies.get("session");

    if (!session) {
        return NextResponse.json(null);
    }

    // Mock user from session
    const user = {
        id: "user-123",
        name: "Nguyễn Văn A",
        email: "user@example.com",
    };

    return NextResponse.json(user);
}
