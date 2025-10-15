import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const body = await request.json();
    const { email, password } = body;

    // Mock validation
    if (!email || !password) {
        return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }

    // Mock user with actual email from login
    const user = {
        id: email === "admin@test.com" ? "admin-001" : "user-123",
        name: email === "admin@test.com" ? "Admin User" : "Nguyễn Văn A",
        email: email, // Use actual email from login
    };

    // Store user data in cookie for session persistence
    const response = NextResponse.json(user);

    // Set session cookie with user data
    response.cookies.set("session", JSON.stringify(user), {
        httpOnly: false, // Should be true in production
        secure: false, // Should be true in production with HTTPS
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
}
