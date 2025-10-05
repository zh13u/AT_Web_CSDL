import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const body = await request.json();
    const { email, password } = body;

    // Mock validation
    if (!email || !password) {
        return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }

    // Mock user
    const user = {
        id: "user-123",
        name: "Nguyễn Văn A",
        email,
    };

    // In a real app, set HttpOnly cookies here
    // For demo, we'll set a non-HttpOnly cookie
    const response = NextResponse.json(user);
    response.cookies.set("session", "mock-session-token", {
        httpOnly: false, // Should be true in production
        secure: false, // Should be true in production with HTTPS
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
}
