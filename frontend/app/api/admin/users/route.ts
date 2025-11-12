import { NextRequest, NextResponse } from "next/server";

// Mock users data
const MOCK_USERS = [
    {
        id: "user-1",
        name: "Nguyễn Văn A",
        email: "nguyenvana@email.com",
        phone: "0901234567",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
        isBlocked: false,
        totalOrders: 5,
        totalSpent: 125000000,
    },
    {
        id: "user-2",
        name: "Trần Thị B",
        email: "tranthib@email.com",
        phone: "0912345678",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60).toISOString(),
        isBlocked: false,
        totalOrders: 3,
        totalSpent: 75000000,
    },
    {
        id: "user-3",
        name: "Lê Văn C",
        email: "levanc@email.com",
        phone: "0923456789",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15).toISOString(),
        isBlocked: true,
        totalOrders: 1,
        totalSpent: 15000000,
    },
];

export async function GET(request: NextRequest) {
    // TODO: Check admin authentication

    await new Promise((resolve) => setTimeout(resolve, 300));

    return NextResponse.json(MOCK_USERS);
}
