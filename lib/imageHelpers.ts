/**
 * Helper để generate ảnh sản phẩm từ các nguồn miễn phí
 * Dùng cho development/demo - Production nên dùng CDN riêng
 */

// === Helper kiểm tra ảnh thật có tồn tại không ===
export function getProductImagePath(slug: string, imageType: 'main' | 'gallery', index = 0): string {
    if (imageType === 'main') {
        return `/images/products/${slug}/main.jpg`;
    }
    return `/images/products/${slug}/gallery-${index}.jpg`;
}

// === Lấy ảnh chính của sản phẩm (ưu tiên ảnh thật) ===
export function getProductMainImage(slug: string, brand: string): string {
    // Thử ảnh thật trước
    const realImagePath = getProductImagePath(slug, 'main');

    // Nếu không có ảnh thật, dùng SVG placeholder theo brand
    return realImagePath;
}

// === Lấy gallery ảnh (ưu tiên ảnh thật) ===
export function getProductGalleryImages(slug: string, brand: string, count = 5): string[] {
    const images: string[] = [];

    // Thử lấy ảnh thật từ gallery-0.jpg đến gallery-4.jpg
    for (let i = 0; i < count; i++) {
        images.push(getProductImagePath(slug, 'gallery', i));
    }

    // Nếu không đủ ảnh, fallback về SVG
    if (images.length === 0) {
        const brandSvg = getLocalPlaceholder(brand);
        return Array.from({ length: count }, () => brandSvg);
    }

    return images;
}

// === OPTION 1: Unsplash (Ảnh đẹp, chất lượng cao) ===
export function getUnsplashImage(query: string, index = 0): string {
    // Random seed để có ảnh khác nhau
    const seed = query + index;
    return `https://source.unsplash.com/400x400/?${encodeURIComponent(query)}&sig=${seed}`;
}

// === OPTION 2: Picsum (Ảnh placeholder random) ===
export function getPicsumImage(seed: number): string {
    return `https://picsum.photos/seed/${seed}/400/400`;
}

// === OPTION 3: UI Avatars (Tạo ảnh từ text) ===
export function getPlaceholderWithText(text: string): string {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(text)}&size=400&background=f3f4f6&color=6b7280&bold=true`;
}

// === OPTION 4: Placehold.co (Customizable placeholder) ===
export function getPlaceholder(width = 400, height = 400, text?: string): string {
    const params = text ? `?text=${encodeURIComponent(text)}` : '';
    return `https://placehold.co/${width}x${height}/e5e7eb/9ca3af${params}`;
}

// === RECOMMEND: Generate ảnh theo brand ===
export function getProductImage(brand: string, productName: string, index = 0): string {
    const brandImages: Record<string, string> = {
        'Apple': 'iphone,smartphone,apple',
        'Samsung': 'samsung,galaxy,smartphone',
        'Xiaomi': 'xiaomi,smartphone,android',
        'OPPO': 'oppo,smartphone,android',
        'Vivo': 'vivo,smartphone,android',
        'Realme': 'realme,smartphone,android',
    };

    const query = brandImages[brand] || 'smartphone,mobile';
    return getUnsplashImage(query, index);
}

// === Ảnh gallery (nhiều ảnh cho 1 sản phẩm) ===
export function getProductGallery(brand: string, productName: string, count = 5): string[] {
    // Với local mode, dùng cùng 1 ảnh cho gallery
    const brandImage = getLocalPlaceholder(brand);
    return Array.from({ length: count }, () => brandImage);
}

// === Local SVG placeholder (không cần mạng) ===
export function getLocalPlaceholder(brand?: string): string {
    // Trả về ảnh SVG theo brand
    const brandImages: Record<string, string> = {
        'Apple': '/phone-iphone.svg',
        'Samsung': '/phone-samsung.svg',
        'Xiaomi': '/phone-xiaomi.svg',
        'OPPO': '/phone-oppo.svg',
        'Vivo': '/phone-vivo.svg',
    };

    return brandImages[brand || ''] || '/placeholder-phone.svg';
}

// === Random giữa nhiều nguồn ===
export function getRandomProductImage(brand: string, productName: string): string {
    const methods = [
        () => getProductImage(brand, productName),
        () => getPicsumImage(Math.random() * 1000),
        () => getPlaceholderWithText(productName.substring(0, 2)),
    ];

    return methods[Math.floor(Math.random() * methods.length)]();
}
