import { NextRequest, NextResponse } from "next/server";

// Mock orders data
const MOCK_ORDERS = [
    {
        id: "ORD-001",
        customerName: "Nguyễn Văn A",
        customerPhone: "0901234567",
        customerAddress: "123 Đường ABC, Quận 1, TP.HCM",
        items: [
            { name: "iPhone 15 Pro Max", quantity: 1, price: 27990000 },
        ],
        total: 27990000,
        status: "pending",
        paymentMethod: "cod",
        createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    },
    {
        id: "ORD-002",
        customerName: "Trần Thị B",
        customerPhone: "0912345678",
        customerAddress: "456 Đường XYZ, Quận 2, TP.HCM",
        items: [
            { name: "Samsung Galaxy S24 Ultra", quantity: 1, price: 15490000 },
        ],
        total: 15490000,
        status: "processing",
        paymentMethod: "transfer",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    },
    {
        id: "ORD-003",
        customerName: "Lê Văn C",
        customerPhone: "0923456789",
        customerAddress: "789 Đường DEF, Quận 3, TP.HCM",
        items: [
            { name: "iPhone 15 Pro", quantity: 1, price: 24990000 },
            { name: "AirPods Pro", quantity: 1, price: 5490000 },
        ],
        total: 30480000,
        status: "shipping",
        paymentMethod: "cod",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    },
    {
        id: "ORD-004",
        customerName: "Phạm Thị D",
        customerPhone: "0934567890",
        customerAddress: "321 Đường GHI, Quận 4, TP.HCM",
        items: [
            { name: "Xiaomi 14 Ultra", quantity: 1, price: 12990000 },
        ],
        total: 12990000,
        status: "completed",
        paymentMethod: "transfer",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    },
];

export async function GET(request: NextRequest) {
    // TODO: Check admin authentication

    await new Promise((resolve) => setTimeout(resolve, 300));

    return NextResponse.json(MOCK_ORDERS);
}
