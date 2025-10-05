import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const body = await request.json();
    const { name, email, phone, password } = body;

    // Mock validation
    if (!name || !email || !phone || !password) {
        return NextResponse.json({ error: "All fields required" }, { status: 400 });
    }

    // Mock user creation
    const user = {
        id: "user-" + Date.now(),
        name,
        email,
        phone,
    };

    const response = NextResponse.json(user);
    response.cookies.set("session", "mock-session-token", {
        httpOnly: false,
        secure: false,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
    });

    return response;
}
