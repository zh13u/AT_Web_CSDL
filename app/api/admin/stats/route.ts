import { NextRequest, NextResponse } from "next/server";
import { MOCK_PRODUCTS } from "@/lib/mockData";

// Mock data for dashboard stats
const MOCK_STATS = {
    totalProducts: MOCK_PRODUCTS.length,
    totalOrders: 127,
    totalUsers: 456,
    totalRevenue: 1250000000,
    recentOrders: [
        {
            id: "ORD-001",
            customerName: "Nguyễn Văn A",
            total: 27990000,
            status: "pending",
            createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        },
        {
            id: "ORD-002",
            customerName: "Trần Thị B",
            total: 15490000,
            status: "processing",
            createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
        },
        {
            id: "ORD-003",
            customerName: "Lê Văn C",
            total: 32990000,
            status: "completed",
            createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
        },
    ],
    lowStockProducts: [
        { id: "1", name: "iPhone 15 Pro Max 512GB", stock: 3 },
        { id: "2", name: "Samsung Galaxy S24 Ultra", stock: 5 },
    ],
};

export async function GET(request: NextRequest) {
    // TODO: Check admin authentication

    await new Promise((resolve) => setTimeout(resolve, 500));

    return NextResponse.json(MOCK_STATS);
}
