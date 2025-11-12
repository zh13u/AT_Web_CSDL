import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const body = await request.json();
    const { email } = body;

    if (!email) {
        return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    // Mock: Always return success
    return NextResponse.json({
        message: "Nếu email tồn tại trong hệ thống, bạn sẽ nhận được email hướng dẫn đặt lại mật khẩu.",
    });
}
