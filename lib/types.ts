export type Product = {
    id: string;
    slug: string;
    name: string;
    brand: string;
    price: number;
    salePrice?: number;
    thumbnail: string;
    rating: number;
    ratingCount: number;
    isHot?: boolean;
    isNew?: boolean;
};

export type Variant = {
    color: string;
    storage: string;
    sku: string;
    stock: number;
    priceAdjustment?: number;
};

export type ProductDetail = Product & {
    gallery: string[];
    videos?: { url: string; poster?: string }[];
    specs: {
        chipset: string;
        ram: string;
        rom: string;
        battery: string;
        display: { size: string; type: string; resolution: string };
        camera: { rear: string; front: string };
        charging: string;
        os: string;
        weight?: string;
    };
    variants: Variant[];
    descriptionHTMLSafe?: string;
};

export type Review = {
    id: string;
    user: { name: string; verifiedPurchase: boolean };
    rating: number;
    content: string;
    createdAt: string;
    media?: { type: "image" | "video"; url: string; poster?: string }[];
};

export type User = {
    id: string;
    name: string;
    email: string;
    phone?: string;
};

export type CartItem = {
    productId: string;
    name: string;
    thumbnail: string;
    variant: { color: string; storage: string; sku: string };
    price: number;
    quantity: number;
};

export type Order = {
    id: string;
    userId: string;
    items: CartItem[];
    total: number;
    status: "pending" | "confirmed" | "shipping" | "completed" | "cancelled";
    createdAt: string;
    shippingAddress: {
        name: string;
        phone: string;
        address: string;
        city: string;
        district: string;
    };
};

export type FilterParams = {
    category?: string;
    brand?: string;
    price?: string;
    ram?: string;
    rom?: string;
    has5G?: boolean;
    sort?: "newest" | "price_asc" | "price_desc" | "popular";
    page?: number;
    pageSize?: number;
};

export type PaginatedResponse<T> = {
    items: T[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
};
