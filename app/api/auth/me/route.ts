import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const session = request.cookies.get("session");

    if (!session || !session.value) {
        return NextResponse.json(null);
    }

    try {
        // Parse user data from session cookie
        const user = JSON.parse(session.value);
        return NextResponse.json(user);
    } catch (error) {
        // If parsing fails, return null (invalid session)
        return NextResponse.json(null);
    }
}
