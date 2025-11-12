import { NextRequest, NextResponse } from "next/server";

// Mock cart storage (in-memory, replace with database in production)
let MOCK_CART: any[] = [];

export async function GET(request: NextRequest) {
    return NextResponse.json({ items: MOCK_CART });
}

export async function POST(request: NextRequest) {
    const body = await request.json();
    const { action, item, sku } = body;

    switch (action) {
        case "add":
            const existing = MOCK_CART.find((i) => i.variant.sku === item.variant.sku);
            if (existing) {
                existing.quantity += item.quantity;
            } else {
                MOCK_CART.push(item);
            }
            break;

        case "remove":
            MOCK_CART = MOCK_CART.filter((i) => i.variant.sku !== sku);
            break;

        case "update":
            const itemToUpdate = MOCK_CART.find((i) => i.variant.sku === sku);
            if (itemToUpdate) {
                itemToUpdate.quantity = item.quantity;
            }
            break;

        case "clear":
            MOCK_CART = [];
            break;
    }

    return NextResponse.json({ items: MOCK_CART });
}
