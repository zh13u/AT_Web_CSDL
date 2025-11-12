import { NextRequest, NextResponse } from "next/server";

// Mock reviews data
const MOCK_REVIEWS = [
    {
        id: "review-1",
        productName: "iPhone 15 Pro Max",
        userName: "Nguyễn Văn A",
        rating: 5,
        content: "Sản phẩm rất tuyệt vời, giao hàng nhanh, đóng gói cẩn thận!",
        createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        status: "pending",
    },
    {
        id: "review-2",
        productName: "Samsung Galaxy S24 Ultra",
        userName: "Trần Thị B",
        rating: 4,
        content: "Điện thoại đẹp, pin trâu, nhưng giá hơi cao.",
        createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
        status: "approved",
    },
    {
        id: "review-3",
        productName: "iPhone 15 Pro",
        userName: "Lê Văn C",
        rating: 1,
        content: "Tệ, không giống như mô tả!",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
        status: "pending",
    },
];

export async function GET(request: NextRequest) {
    // TODO: Check admin authentication

    await new Promise((resolve) => setTimeout(resolve, 300));

    return NextResponse.json(MOCK_REVIEWS);
}
