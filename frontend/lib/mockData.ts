import { Product, ProductDetail, Review, Variant } from "./types";
import { getLocalPlaceholder } from "./imageHelpers";

// Chọn nguồn ảnh: 'real' | 'svg'
// 'real' - dùng ảnh thật từ /images/products/[slug]/
// 'svg' - dùng SVG placeholder theo brand
const IMAGE_SOURCE: 'real' | 'svg' = 'real';

function getImage(slug: string, brand: string): string {
    if (IMAGE_SOURCE === 'real') {
        // Ưu tiên ảnh thật, nếu không có sẽ fallback về SVG trong next/image
        return `/images/products/${slug}/main.jpg`;
    }
    // Fallback về SVG placeholder
    return getLocalPlaceholder(brand);
}

function getGallery(slug: string, brand: string, count = 5): string[] {
    if (IMAGE_SOURCE === 'real') {
        // Tạo array ảnh gallery
        return Array.from({ length: count }, (_, i) => `/images/products/${slug}/gallery-${i}.jpg`);
    }
    // Fallback về SVG placeholder
    const brandImage = getLocalPlaceholder(brand);
    return Array.from({ length: count }, () => brandImage);
}

// Mock product data - 30 sản phẩm thật
export const MOCK_PRODUCTS: Product[] = [
    // Apple iPhone (6 sản phẩm)
    {
        id: "1",
        slug: "iphone-15-pro-max",
        name: "iPhone 15 Pro Max 256GB",
        brand: "Apple",
        price: 33990000,
        salePrice: 29990000,
        thumbnail: getImage("iphone-15-pro-max", "Apple"),
        rating: 4.8,
        ratingCount: 245,
        isHot: true,
        isNew: true,
    },
    {
        id: "5",
        slug: "iphone-15-pro",
        name: "iPhone 15 Pro 128GB",
        brand: "Apple",
        price: 28990000,
        salePrice: 26990000,
        thumbnail: getImage("iphone-15-pro", "Apple"),
        rating: 4.7,
        ratingCount: 198,
        isHot: true,
    },
    {
        id: "6",
        slug: "iphone-15-plus",
        name: "iPhone 15 Plus 128GB",
        brand: "Apple",
        price: 24990000,
        thumbnail: getImage("iphone-15-plus", "Apple"),
        rating: 4.6,
        ratingCount: 167,
    },
    {
        id: "7",
        slug: "iphone-15",
        name: "iPhone 15 128GB",
        brand: "Apple",
        price: 22990000,
        salePrice: 21490000,
        thumbnail: getImage("iphone-15", "Apple"),
        rating: 4.7,
        ratingCount: 289,
        isHot: true,
    },
    {
        id: "8",
        slug: "iphone-14-pro-max",
        name: "iPhone 14 Pro Max 256GB",
        brand: "Apple",
        price: 27990000,
        salePrice: 24990000,
        thumbnail: getImage("iphone-14-pro-max", "Apple"),
        rating: 4.6,
        ratingCount: 412,
    },
    {
        id: "9",
        slug: "iphone-14",
        name: "iPhone 14 128GB",
        brand: "Apple",
        price: 19990000,
        salePrice: 17990000,
        thumbnail: getImage("iphone-14", "Apple"),
        rating: 4.5,
        ratingCount: 356,
    },

    // Samsung (8 sản phẩm)
    {
        id: "2",
        slug: "samsung-galaxy-s24-ultra",
        name: "Samsung Galaxy S24 Ultra 12GB 256GB",
        brand: "Samsung",
        price: 29990000,
        salePrice: 27990000,
        thumbnail: getImage("samsung-galaxy-s24-ultra", "Samsung"),
        rating: 4.7,
        ratingCount: 189,
        isHot: true,
        isNew: true,
    },
    {
        id: "10",
        slug: "samsung-galaxy-s24-plus",
        name: "Samsung Galaxy S24+ 12GB 256GB",
        brand: "Samsung",
        price: 24990000,
        salePrice: 22990000,
        thumbnail: getImage("samsung-galaxy-s24-plus", "Samsung"),
        rating: 4.6,
        ratingCount: 145,
        isNew: true,
    },
    {
        id: "11",
        slug: "samsung-galaxy-s24",
        name: "Samsung Galaxy S24 8GB 128GB",
        brand: "Samsung",
        price: 19990000,
        thumbnail: getImage("samsung-galaxy-s24", "Samsung"),
        rating: 4.5,
        ratingCount: 178,
        isNew: true,
    },
    {
        id: "12",
        slug: "samsung-galaxy-z-fold5",
        name: "Samsung Galaxy Z Fold5 12GB 256GB",
        brand: "Samsung",
        price: 40990000,
        salePrice: 36990000,
        thumbnail: getImage("samsung-galaxy-z-fold5", "Samsung"),
        rating: 4.8,
        ratingCount: 98,
        isHot: true,
    },
    {
        id: "13",
        slug: "samsung-galaxy-z-flip5",
        name: "Samsung Galaxy Z Flip5 8GB 256GB",
        brand: "Samsung",
        price: 23990000,
        salePrice: 21990000,
        thumbnail: getImage("samsung-galaxy-z-flip5", "Samsung"),
        rating: 4.6,
        ratingCount: 134,
    },
    {
        id: "14",
        slug: "samsung-galaxy-a55",
        name: "Samsung Galaxy A55 8GB 128GB",
        brand: "Samsung",
        price: 10990000,
        salePrice: 9990000,
        thumbnail: getImage("samsung-galaxy-a55", "Samsung"),
        rating: 4.4,
        ratingCount: 256,
    },
    {
        id: "15",
        slug: "samsung-galaxy-a35",
        name: "Samsung Galaxy A35 8GB 128GB",
        brand: "Samsung",
        price: 8990000,
        thumbnail: getImage("samsung-galaxy-a35", "Samsung"),
        rating: 4.3,
        ratingCount: 189,
    },
    {
        id: "16",
        slug: "samsung-galaxy-m34",
        name: "Samsung Galaxy M34 8GB 128GB",
        brand: "Samsung",
        price: 6990000,
        salePrice: 6490000,
        thumbnail: getImage("samsung-galaxy-m34", "Samsung"),
        rating: 4.2,
        ratingCount: 167,
    },

    // Xiaomi (8 sản phẩm)
    {
        id: "3",
        slug: "xiaomi-14-ultra",
        name: "Xiaomi 14 Ultra 16GB 512GB",
        brand: "Xiaomi",
        price: 24990000,
        thumbnail: getImage("xiaomi-14-ultra", "Xiaomi"),
        rating: 4.6,
        ratingCount: 156,
        isNew: true,
    },
    {
        id: "17",
        slug: "xiaomi-14",
        name: "Xiaomi 14 12GB 256GB",
        brand: "Xiaomi",
        price: 18990000,
        salePrice: 17490000,
        thumbnail: getImage("xiaomi-14", "Xiaomi"),
        rating: 4.5,
        ratingCount: 189,
        isNew: true,
    },
    {
        id: "18",
        slug: "xiaomi-13t-pro",
        name: "Xiaomi 13T Pro 12GB 256GB",
        brand: "Xiaomi",
        price: 13990000,
        salePrice: 12490000,
        thumbnail: getImage("xiaomi-13t-pro", "Xiaomi"),
        rating: 4.4,
        ratingCount: 234,
    },
    {
        id: "19",
        slug: "xiaomi-redmi-note-13-pro-plus",
        name: "Xiaomi Redmi Note 13 Pro+ 8GB 256GB",
        brand: "Xiaomi",
        price: 9990000,
        salePrice: 8990000,
        thumbnail: getImage("xiaomi-redmi-note-13-pro-plus", "Xiaomi"),
        rating: 4.5,
        ratingCount: 312,
        isHot: true,
    },
    {
        id: "20",
        slug: "xiaomi-redmi-note-13-pro",
        name: "Xiaomi Redmi Note 13 Pro 8GB 128GB",
        brand: "Xiaomi",
        price: 7990000,
        thumbnail: getImage("xiaomi-redmi-note-13-pro", "Xiaomi"),
        rating: 4.3,
        ratingCount: 267,
    },
    {
        id: "21",
        slug: "xiaomi-redmi-13c",
        name: "Xiaomi Redmi 13C 6GB 128GB",
        brand: "Xiaomi",
        price: 3490000,
        salePrice: 2990000,
        thumbnail: getImage("xiaomi-redmi-13c", "Xiaomi"),
        rating: 4.1,
        ratingCount: 198,
    },
    {
        id: "22",
        slug: "xiaomi-poco-x6-pro",
        name: "Xiaomi POCO X6 Pro 12GB 256GB",
        brand: "Xiaomi",
        price: 9490000,
        salePrice: 8490000,
        thumbnail: getImage("xiaomi-poco-x6-pro", "Xiaomi"),
        rating: 4.4,
        ratingCount: 156,
    },
    {
        id: "23",
        slug: "xiaomi-poco-f5",
        name: "Xiaomi POCO F5 8GB 256GB",
        brand: "Xiaomi",
        price: 7990000,
        thumbnail: getImage("xiaomi-poco-f5", "Xiaomi"),
        rating: 4.3,
        ratingCount: 134,
    },

    // OPPO (4 sản phẩm)
    {
        id: "4",
        slug: "oppo-find-x7-ultra",
        name: "OPPO Find X7 Ultra 16GB 512GB",
        brand: "OPPO",
        price: 22990000,
        salePrice: 19990000,
        thumbnail: getImage("oppo-find-x7-ultra", "OPPO"),
        rating: 4.5,
        ratingCount: 98,
        isNew: true,
    },
    {
        id: "24",
        slug: "oppo-find-n3",
        name: "OPPO Find N3 12GB 256GB",
        brand: "OPPO",
        price: 24990000,
        salePrice: 22990000,
        thumbnail: getImage("oppo-find-n3", "OPPO"),
        rating: 4.6,
        ratingCount: 87,
    },
    {
        id: "25",
        slug: "oppo-reno11-pro",
        name: "OPPO Reno11 Pro 5G 12GB 256GB",
        brand: "OPPO",
        price: 12990000,
        salePrice: 11990000,
        thumbnail: getImage("oppo-reno11-pro", "OPPO"),
        rating: 4.4,
        ratingCount: 145,
    },
    {
        id: "26",
        slug: "oppo-a78",
        name: "OPPO A78 8GB 128GB",
        brand: "OPPO",
        price: 6490000,
        thumbnail: getImage("oppo-a78", "OPPO"),
        rating: 4.2,
        ratingCount: 178,
    },

    // Vivo (4 sản phẩm)
    {
        id: "27",
        slug: "vivo-x100-pro",
        name: "Vivo X100 Pro 16GB 512GB",
        brand: "Vivo",
        price: 24990000,
        salePrice: 22990000,
        thumbnail: getImage("vivo-x100-pro", "Vivo"),
        rating: 4.5,
        ratingCount: 112,
        isNew: true,
    },
    {
        id: "28",
        slug: "vivo-v29e",
        name: "Vivo V29e 12GB 256GB",
        brand: "Vivo",
        price: 8490000,
        salePrice: 7490000,
        thumbnail: getImage("vivo-v29e", "Vivo"),
        rating: 4.3,
        ratingCount: 156,
    },
    {
        id: "29",
        slug: "vivo-y36",
        name: "Vivo Y36 8GB 128GB",
        brand: "Vivo",
        price: 5990000,
        thumbnail: getImage("vivo-y36", "Vivo"),
        rating: 4.1,
        ratingCount: 198,
    },
    {
        id: "30",
        slug: "vivo-y17s",
        name: "Vivo Y17s 6GB 128GB",
        brand: "Vivo",
        price: 3990000,
        salePrice: 3490000,
        thumbnail: getImage("vivo-y17s", "Vivo"),
        rating: 4.0,
        ratingCount: 167,
    },
];

export const MOCK_PRODUCT_DETAILS: Record<string, ProductDetail> = {
    "iphone-15-pro-max": {
        id: "1",
        slug: "iphone-15-pro-max",
        name: "iPhone 15 Pro Max 256GB",
        brand: "Apple",
        price: 33990000,
        salePrice: 29990000,
        thumbnail: getImage("iphone-15-pro-max", "Apple"),
        rating: 4.8,
        ratingCount: 245,
        isHot: true,
        isNew: true,
        gallery: getGallery("iphone-15-pro-max", "Apple", 5),
        videos: [
            {
                url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                poster: "/placeholder-phone.svg",
            },
        ],
        specs: {
            chipset: "Apple A17 Pro",
            ram: "8GB",
            rom: "256GB",
            battery: "4422mAh",
            display: {
                size: "6.7 inch",
                type: "Super Retina XDR OLED",
                resolution: "2796 x 1290 pixels",
            },
            camera: {
                rear: "48MP + 12MP + 12MP",
                front: "12MP",
            },
            charging: "20W",
            os: "iOS 17",
            weight: "221g",
        },
        variants: [
            { color: "Titan Tự nhiên", storage: "256GB", sku: "IP15PM-TN-256", stock: 50 },
            { color: "Titan Tự nhiên", storage: "512GB", sku: "IP15PM-TN-512", stock: 30 },
            { color: "Titan Xanh", storage: "256GB", sku: "IP15PM-TX-256", stock: 40 },
            { color: "Titan Xanh", storage: "512GB", sku: "IP15PM-TX-512", stock: 25 },
        ],
        descriptionHTMLSafe: `
      <h3>iPhone 15 Pro Max - Đỉnh cao công nghệ</h3>
      <p>iPhone 15 Pro Max là flagship mới nhất từ Apple với nhiều cải tiến vượt trội.</p>
      <ul>
        <li>Chip A17 Pro - hiệu năng mạnh mẽ nhất từ trước đến nay</li>
        <li>Camera 48MP với khả năng zoom quang học 5x</li>
        <li>Khung Titan nhẹ và bền vững</li>
        <li>Màn hình Super Retina XDR OLED 6.7 inch</li>
      </ul>
    `,
    },
    "samsung-galaxy-s24-ultra": {
        id: "2",
        slug: "samsung-galaxy-s24-ultra",
        name: "Samsung Galaxy S24 Ultra 12GB 256GB",
        brand: "Samsung",
        price: 29990000,
        salePrice: 27990000,
        thumbnail: getImage("samsung-galaxy-s24-ultra", "Samsung"),
        rating: 4.7,
        ratingCount: 189,
        isHot: true,
        gallery: getGallery("samsung-galaxy-s24-ultra", "Samsung", 5),
        specs: {
            chipset: "Snapdragon 8 Gen 3",
            ram: "12GB",
            rom: "256GB",
            battery: "5000mAh",
            display: {
                size: "6.8 inch",
                type: "Dynamic AMOLED 2X",
                resolution: "3120 x 1440 pixels",
            },
            camera: {
                rear: "200MP + 50MP + 12MP + 10MP",
                front: "12MP",
            },
            charging: "45W",
            os: "Android 14, One UI 6.1",
            weight: "232g",
        },
        variants: [
            { color: "Titan Gray", storage: "256GB", sku: "S24U-TG-256", stock: 45 },
            { color: "Titan Gray", storage: "512GB", sku: "S24U-TG-512", stock: 30 },
            { color: "Titan Black", storage: "256GB", sku: "S24U-TB-256", stock: 40 },
            { color: "Titan Violet", storage: "512GB", sku: "S24U-TV-512", stock: 25 },
        ],
        descriptionHTMLSafe: `
      <h3>Samsung Galaxy S24 Ultra - Siêu phẩm AI</h3>
      <p>Galaxy S24 Ultra mang đến trải nghiệm AI tiên tiến nhất trong thế giới smartphone Android.</p>
      <ul>
        <li>Snapdragon 8 Gen 3 for Galaxy - hiệu năng đỉnh cao</li>
        <li>Camera 200MP với AI Super Resolution</li>
        <li>Bút S Pen tích hợp với AI Note Assist</li>
        <li>Màn hình Dynamic AMOLED 2X 6.8 inch 120Hz</li>
      </ul>
    `,
    },
    "xiaomi-14-ultra": {
        id: "3",
        slug: "xiaomi-14-ultra",
        name: "Xiaomi 14 Ultra 16GB 512GB",
        brand: "Xiaomi",
        price: 24990000,
        thumbnail: getImage("xiaomi-14-ultra", "Xiaomi"),
        rating: 4.6,
        ratingCount: 156,
        isNew: true,
        gallery: getGallery("xiaomi-14-ultra", "Xiaomi", 5),
        specs: {
            chipset: "Snapdragon 8 Gen 3",
            ram: "16GB",
            rom: "512GB",
            battery: "5000mAh",
            display: {
                size: "6.73 inch",
                type: "AMOLED LTPO",
                resolution: "3200 x 1440 pixels",
            },
            camera: {
                rear: "50MP + 50MP + 50MP + 50MP (Leica)",
                front: "32MP",
            },
            charging: "90W",
            os: "Android 14, HyperOS",
            weight: "219g",
        },
        variants: [
            { color: "Đen", storage: "512GB", sku: "X14U-BK-512", stock: 35 },
            { color: "Trắng", storage: "512GB", sku: "X14U-WH-512", stock: 30 },
            { color: "Đen", storage: "1TB", sku: "X14U-BK-1TB", stock: 20 },
        ],
        descriptionHTMLSafe: `
      <h3>Xiaomi 14 Ultra - Bậc thầy nhiếp ảnh</h3>
      <p>Xiaomi 14 Ultra là smartphone camera phone hàng đầu với hệ thống Leica 4 ống kính 50MP.</p>
      <ul>
        <li>4 camera 50MP Leica với khả năng zoom quang học 5x</li>
        <li>Chip Snapdragon 8 Gen 3 mạnh mẽ</li>
        <li>Sạc nhanh 90W, đầy pin trong 30 phút</li>
        <li>Màn hình AMOLED LTPO 120Hz</li>
      </ul>
    `,
    },
    "oppo-find-x7-ultra": {
        id: "4",
        slug: "oppo-find-x7-ultra",
        name: "OPPO Find X7 Ultra 16GB 512GB",
        brand: "OPPO",
        price: 22990000,
        salePrice: 19990000,
        thumbnail: getImage("oppo-find-x7-ultra", "OPPO"),
        rating: 4.5,
        ratingCount: 98,
        gallery: getGallery("oppo-find-x7-ultra", "OPPO", 5),
        specs: {
            chipset: "Snapdragon 8 Gen 3",
            ram: "16GB",
            rom: "512GB",
            battery: "5000mAh",
            display: {
                size: "6.82 inch",
                type: "AMOLED LTPO",
                resolution: "3168 x 1440 pixels",
            },
            camera: {
                rear: "50MP + 50MP + 50MP (Hasselblad)",
                front: "32MP",
            },
            charging: "100W",
            os: "Android 14, ColorOS 14",
            weight: "221g",
        },
        variants: [
            { color: "Đen", storage: "512GB", sku: "OX7U-BK-512", stock: 30 },
            { color: "Xanh", storage: "512GB", sku: "OX7U-BL-512", stock: 25 },
        ],
        descriptionHTMLSafe: `
      <h3>OPPO Find X7 Ultra - Đỉnh cao Hasselblad</h3>
      <p>Find X7 Ultra mang đến trải nghiệm nhiếp ảnh chuyên nghiệp với camera Hasselblad.</p>
      <ul>
        <li>3 camera 50MP Hasselblad chất lượng cao</li>
        <li>Sạc siêu nhanh 100W</li>
        <li>Màn hình AMOLED LTPO 120Hz</li>
        <li>Thiết kế cao cấp với vật liệu premium</li>
      </ul>
    `,
    },
    // iPhone 15 Pro
    "iphone-15-pro": {
        id: "5",
        slug: "iphone-15-pro",
        name: "iPhone 15 Pro 128GB",
        brand: "Apple",
        price: 27990000,
        salePrice: 25990000,
        thumbnail: getImage("iphone-15-pro", "Apple"),
        rating: 4.8,
        ratingCount: 234,
        isNew: true,
        gallery: getGallery("iphone-15-pro", "Apple", 5),
        specs: {
            chipset: "Apple A17 Pro (3nm)",
            ram: "8GB",
            rom: "128GB",
            battery: "3274mAh",
            display: { size: "6.1 inch", type: "Super Retina XDR OLED LTPO", resolution: "2556 x 1179 pixels" },
            camera: { rear: "48MP Main + 12MP Ultra Wide + 12MP Telephoto (3x)", front: "12MP TrueDepth" },
            charging: "20W, MagSafe 15W",
            os: "iOS 17",
            weight: "187g",
        },
        variants: [
            { color: "Titan Tự Nhiên", storage: "128GB", sku: "IP15P-TN-128", stock: 50 },
            { color: "Titan Xanh", storage: "128GB", sku: "IP15P-BL-128", stock: 45 },
            { color: "Titan Trắng", storage: "128GB", sku: "IP15P-WH-128", stock: 40 },
            { color: "Titan Đen", storage: "128GB", sku: "IP15P-BK-128", stock: 48 },
        ],
        descriptionHTMLSafe: `
      <h3>iPhone 15 Pro - Titan. Mạnh mẽ. Pro.</h3>
      <p>iPhone 15 Pro mang đến thiết kế titan hàng không vũ trụ siêu nhẹ, chip A17 Pro mạnh mẽ nhất từ trước đến nay và nút Action tùy biến độc đáo.</p>
      <ul>
        <li>Chip A17 Pro với GPU 6 nhân, hiệu năng đồ họa vượt trội cho gaming</li>
        <li>Khung titan chuẩn hàng không vũ trụ, nhẹ hơn 19g so với iPhone 14 Pro</li>
        <li>Camera chính 48MP với zoom quang học 3x</li>
        <li>Màn hình ProMotion 120Hz luôn bật với Dynamic Island</li>
        <li>Nút Action tùy biến thay thế công tắc rung</li>
        <li>Cổng USB-C với tốc độ truyền USB 3.0 lên đến 10Gb/s</li>
      </ul>
    `,
    },
    // iPhone 15 Plus
    "iphone-15-plus": {
        id: "6",
        slug: "iphone-15-plus",
        name: "iPhone 15 Plus 128GB",
        brand: "Apple",
        price: 24990000,
        thumbnail: getImage("iphone-15-plus", "Apple"),
        rating: 4.7,
        ratingCount: 189,
        gallery: getGallery("iphone-15-plus", "Apple", 5),
        specs: {
            chipset: "Apple A16 Bionic",
            ram: "6GB",
            rom: "128GB",
            battery: "4383mAh",
            display: { size: "6.7 inch", type: "Super Retina XDR OLED", resolution: "2796 x 1290 pixels" },
            camera: { rear: "48MP Main + 12MP Ultra Wide", front: "12MP TrueDepth" },
            charging: "20W, MagSafe 15W",
            os: "iOS 17",
            weight: "201g",
        },
        variants: [
            { color: "Xanh", storage: "128GB", sku: "IP15PL-BL-128", stock: 50 },
            { color: "Hồng", storage: "128GB", sku: "IP15PL-PK-128", stock: 45 },
            { color: "Vàng", storage: "128GB", sku: "IP15PL-YL-128", stock: 40 },
            { color: "Đen", storage: "128GB", sku: "IP15PL-BK-128", stock: 48 },
        ],
        descriptionHTMLSafe: `
      <h3>iPhone 15 Plus - Màn hình lớn. Pin trâu bò.</h3>
      <p>iPhone 15 Plus với màn hình 6.7 inch và thời lượng pin ấn tượng, hoàn hảo cho ai yêu thích màn hình lớn.</p>
      <ul>
        <li>Màn hình Super Retina XDR 6.7 inch siêu sắc nét</li>
        <li>Pin 4383mAh cho thời gian sử dụng dài nhất trong dòng iPhone 15</li>
        <li>Camera 48MP chụp ảnh chân dung tự động với Focus và Depth Control</li>
        <li>Dynamic Island thông minh hiển thị thông báo sống động</li>
        <li>Ceramic Shield bền bỉ nhất từng có trên smartphone</li>
        <li>Cổng USB-C thuận tiện</li>
      </ul>
    `,
    },
    // iPhone 15
    "iphone-15": {
        id: "7",
        slug: "iphone-15",
        name: "iPhone 15 128GB",
        brand: "Apple",
        price: 21990000,
        salePrice: 19990000,
        thumbnail: getImage("iphone-15", "Apple"),
        rating: 4.6,
        ratingCount: 312,
        isHot: true,
        gallery: getGallery("iphone-15", "Apple", 5),
        specs: {
            chipset: "Apple A16 Bionic",
            ram: "6GB",
            rom: "128GB",
            battery: "3349mAh",
            display: { size: "6.1 inch", type: "Super Retina XDR OLED", resolution: "2556 x 1179 pixels" },
            camera: { rear: "48MP Main + 12MP Ultra Wide", front: "12MP TrueDepth" },
            charging: "20W, MagSafe 15W",
            os: "iOS 17",
            weight: "171g",
        },
        variants: [
            { color: "Hồng", storage: "128GB", sku: "IP15-PK-128", stock: 50 },
            { color: "Xanh", storage: "128GB", sku: "IP15-BL-128", stock: 48 },
            { color: "Vàng", storage: "128GB", sku: "IP15-YL-128", stock: 45 },
            { color: "Đen", storage: "128GB", sku: "IP15-BK-128", stock: 50 },
        ],
        descriptionHTMLSafe: `
      <h3>iPhone 15 - Mới. Cực mới. Siêu mới.</h3>
      <p>iPhone 15 với Dynamic Island, camera 48MP và thiết kế kính màu mới hoàn toàn.</p>
      <ul>
        <li>Dynamic Island - cách mới để tương tác với iPhone</li>
        <li>Camera 48MP chụp ảnh siêu chi tiết, zoom 2x quang học</li>
        <li>Chip A16 Bionic mạnh mẽ từ thế hệ Pro trước</li>
        <li>Thiết kế kính màu mờ sang trọng với viền nhôm</li>
        <li>Cổng USB-C tiện lợi cho mọi thiết bị</li>
        <li>SOS khẩn cấp qua vệ tinh (sắp ra mắt tại VN)</li>
      </ul>
    `,
    },
    // iPhone 14 Pro Max
    "iphone-14-pro-max": {
        id: "8",
        slug: "iphone-14-pro-max",
        name: "iPhone 14 Pro Max 256GB",
        brand: "Apple",
        price: 29990000,
        salePrice: 26990000,
        thumbnail: getImage("iphone-14-pro-max", "Apple"),
        rating: 4.9,
        ratingCount: 456,
        gallery: getGallery("iphone-14-pro-max", "Apple", 5),
        specs: {
            chipset: "Apple A16 Bionic",
            ram: "6GB",
            rom: "256GB",
            battery: "4323mAh",
            display: { size: "6.7 inch", type: "Super Retina XDR OLED ProMotion", resolution: "2796 x 1290 pixels" },
            camera: { rear: "48MP Main + 12MP Ultra Wide + 12MP Telephoto (3x)", front: "12MP TrueDepth" },
            charging: "20W, MagSafe 15W",
            os: "iOS 16, nâng cấp iOS 17",
            weight: "240g",
        },
        variants: [
            { color: "Tím", storage: "256GB", sku: "IP14PM-PP-256", stock: 40 },
            { color: "Đen", storage: "256GB", sku: "IP14PM-BK-256", stock: 35 },
            { color: "Vàng", storage: "256GB", sku: "IP14PM-GL-256", stock: 30 },
        ],
        descriptionHTMLSafe: `
      <h3>iPhone 14 Pro Max - Đỉnh cao iPhone 2022</h3>
      <p>iPhone 14 Pro Max là chiếc iPhone đầu tiên có Dynamic Island và camera 48MP, pin khủng nhất.</p>
      <ul>
        <li>Dynamic Island - đột phá giao diện người dùng</li>
        <li>Camera chính 48MP cảm biến Quad-pixel lớn nhất từng có</li>
        <li>Always-On Display - luôn hiển thị thông tin quan trọng</li>
        <li>Màn hình ProMotion 120Hz adaptive từ 1Hz đến 120Hz</li>
        <li>Pin 4323mAh sử dụng cả ngày dài</li>
        <li>Chip A16 Bionic 4nm cực kỳ mạnh mẽ</li>
      </ul>
    `,
    },
    // iPhone 14
    "iphone-14": {
        id: "9",
        slug: "iphone-14",
        name: "iPhone 14 128GB",
        brand: "Apple",
        price: 18990000,
        thumbnail: getImage("iphone-14", "Apple"),
        rating: 4.5,
        ratingCount: 289,
        gallery: getGallery("iphone-14", "Apple", 5),
        specs: {
            chipset: "Apple A15 Bionic",
            ram: "6GB",
            rom: "128GB",
            battery: "3279mAh",
            display: { size: "6.1 inch", type: "Super Retina XDR OLED", resolution: "2532 x 1170 pixels" },
            camera: { rear: "12MP Wide + 12MP Ultra Wide", front: "12MP TrueDepth" },
            charging: "20W, MagSafe 15W",
            os: "iOS 16, nâng cấp iOS 17",
            weight: "172g",
        },
        variants: [
            { color: "Xanh", storage: "128GB", sku: "IP14-BL-128", stock: 50 },
            { color: "Tím", storage: "128GB", sku: "IP14-PP-128", stock: 45 },
            { color: "Đỏ", storage: "128GB", sku: "IP14-RD-128", stock: 40 },
        ],
        descriptionHTMLSafe: `
      <h3>iPhone 14 - Giá tốt nhất hiện nay</h3>
      <p>iPhone 14 với giá đã giảm mạnh, là lựa chọn tuyệt vời cho ai muốn trải nghiệm iPhone chính hãng.</p>
      <ul>
        <li>Chip A15 Bionic 5 nhân GPU mạnh mẽ</li>
        <li>Camera chính 12MP cải tiến với cảm biến lớn hơn</li>
        <li>Photonic Engine nâng cao chất lượng ảnh thiếu sáng</li>
        <li>Màn hình Super Retina XDR sáng 1200 nits</li>
        <li>SOS khẩn cấp qua vệ tinh</li>
        <li>Giá cực tốt sau khi giảm</li>
      </ul>
    `,
    },
    // Samsung S24+
    "samsung-galaxy-s24-plus": {
        id: "10",
        slug: "samsung-galaxy-s24-plus",
        name: "Samsung Galaxy S24+ 12GB 256GB",
        brand: "Samsung",
        price: 24990000,
        salePrice: 22990000,
        thumbnail: getImage("samsung-galaxy-s24-plus", "Samsung"),
        rating: 4.7,
        ratingCount: 178,
        isNew: true,
        gallery: getGallery("samsung-galaxy-s24-plus", "Samsung", 5),
        specs: {
            chipset: "Snapdragon 8 Gen 3 for Galaxy",
            ram: "12GB",
            rom: "256GB",
            battery: "4900mAh",
            display: { size: "6.7 inch", type: "Dynamic AMOLED 2X", resolution: "3120 x 1440 pixels (QHD+)" },
            camera: { rear: "50MP Wide + 12MP Ultra Wide + 10MP Telephoto 3x", front: "12MP" },
            charging: "45W, Wireless 15W",
            os: "Android 14, One UI 6.1 với Galaxy AI",
            weight: "196g",
        },
        variants: [
            { color: "Tím Cobalt", storage: "256GB", sku: "S24P-PP-256", stock: 45 },
            { color: "Xám", storage: "256GB", sku: "S24P-GR-256", stock: 40 },
            { color: "Vàng", storage: "256GB", sku: "S24P-YL-256", stock: 38 },
        ],
        descriptionHTMLSafe: `
      <h3>Galaxy S24+ - Cân bằng hoàn hảo</h3>
      <p>S24+ mang đến sự cân bằng tuyệt vời giữa kích thước, hiệu năng và pin, cùng Galaxy AI thông minh.</p>
      <ul>
        <li>Snapdragon 8 Gen 3 for Galaxy - hiệu năng khủng nhất</li>
        <li>Galaxy AI: Circle to Search, Live Translate, Photo Assist</li>
        <li>Màn hình QHD+ Vision Booster sáng 2600 nits</li>
        <li>Pin 4900mAh, sạc nhanh 45W</li>
        <li>Khung nhôm Armor, Gorilla Glass Victus 2</li>
        <li>7 năm cập nhật OS và bảo mật</li>
      </ul>
    `,
    },
    // Samsung S24
    "samsung-galaxy-s24": {
        id: "11",
        slug: "samsung-galaxy-s24",
        name: "Samsung Galaxy S24 8GB 128GB",
        brand: "Samsung",
        price: 18990000,
        salePrice: 16990000,
        thumbnail: getImage("samsung-galaxy-s24", "Samsung"),
        rating: 4.6,
        ratingCount: 234,
        gallery: getGallery("samsung-galaxy-s24", "Samsung", 5),
        specs: {
            chipset: "Exynos 2400",
            ram: "8GB",
            rom: "128GB",
            battery: "4000mAh",
            display: { size: "6.2 inch", type: "Dynamic AMOLED 2X", resolution: "2340 x 1080 pixels (FHD+)" },
            camera: { rear: "50MP Wide + 12MP Ultra Wide + 10MP Telephoto 3x", front: "12MP" },
            charging: "25W, Wireless 15W",
            os: "Android 14, One UI 6.1 với Galaxy AI",
            weight: "167g",
        },
        variants: [
            { color: "Xám Onyx", storage: "128GB", sku: "S24-GR-128", stock: 50 },
            { color: "Tím Cobalt", storage: "128GB", sku: "S24-PP-128", stock: 45 },
            { color: "Vàng", storage: "128GB", sku: "S24-YL-128", stock: 40 },
        ],
        descriptionHTMLSafe: `
      <h3>Galaxy S24 - Flagship nhỏ gọn với AI</h3>
      <p>S24 là flagship nhỏ gọn nhất với đầy đủ tính năng Galaxy AI và hiệu năng mạnh mẽ.</p>
      <ul>
        <li>Exynos 2400 10 nhân mạnh mẽ, đối đầu Snapdragon 8 Gen 3</li>
        <li>Galaxy AI: dịch trực tiếp cuộc gọi, tìm kiếm vòng tròn</li>
        <li>Màn hình compact 6.2 inch dễ cầm nắm một tay</li>
        <li>Khung nhôm Armor nhẹ chỉ 167g</li>
        <li>Camera Nightography chụp đêm siêu đẹp</li>
        <li>Giá tốt nhất dòng S24</li>
      </ul>
    `,
    },
    // Samsung Z Fold5
    "samsung-galaxy-z-fold5": {
        id: "12",
        slug: "samsung-galaxy-z-fold5",
        name: "Samsung Galaxy Z Fold5 12GB 256GB",
        brand: "Samsung",
        price: 34990000,
        salePrice: 29990000,
        thumbnail: getImage("samsung-galaxy-z-fold5", "Samsung"),
        rating: 4.8,
        ratingCount: 98,
        gallery: getGallery("samsung-galaxy-z-fold5", "Samsung", 5),
        specs: {
            chipset: "Snapdragon 8 Gen 2 for Galaxy",
            ram: "12GB",
            rom: "256GB",
            battery: "4400mAh",
            display: { size: "7.6 inch (Main), 6.2 inch (Cover)", type: "Dynamic AMOLED 2X", resolution: "2176 x 1812 pixels" },
            camera: { rear: "50MP Wide + 12MP Ultra Wide + 10MP Telephoto 3x", front: "10MP Cover + 4MP Under Display" },
            charging: "25W, Wireless 15W",
            os: "Android 13, One UI 5.1.1, nâng cấp One UI 6",
            weight: "253g",
        },
        variants: [
            { color: "Đen Phantom", storage: "256GB", sku: "ZF5-BK-256", stock: 30 },
            { color: "Kem", storage: "256GB", sku: "ZF5-CR-256", stock: 25 },
        ],
        descriptionHTMLSafe: `
      <h3>Galaxy Z Fold5 - Tablet gập trong túi</h3>
      <p>Z Fold5 với bản lề Flex mới gập không khe hở, biến thành tablet 7.6 inch cực kỳ tiện lợi.</p>
      <ul>
        <li>Màn hình chính 7.6 inch gập không khe hở lần đầu tiên</li>
        <li>Bản lề Flex Hinge bền bỉ, mỏng hơn 2.4mm</li>
        <li>Multitasking đỉnh cao với 3 app cùng lúc</li>
        <li>S Pen hỗ trợ (bán riêng) cho ghi chú chuyên nghiệp</li>
        <li>Snapdragon 8 Gen 2 for Galaxy siêu mạnh</li>
        <li>IPX8 chống nước chuẩn quân đội</li>
      </ul>
    `,
    },
    // Samsung Z Flip5
    "samsung-galaxy-z-flip5": {
        id: "13",
        slug: "samsung-galaxy-z-flip5",
        name: "Samsung Galaxy Z Flip5 8GB 256GB",
        brand: "Samsung",
        price: 19990000,
        salePrice: 17990000,
        thumbnail: getImage("samsung-galaxy-z-flip5", "Samsung"),
        rating: 4.6,
        ratingCount: 167,
        gallery: getGallery("samsung-galaxy-z-flip5", "Samsung", 5),
        specs: {
            chipset: "Snapdragon 8 Gen 2 for Galaxy",
            ram: "8GB",
            rom: "256GB",
            battery: "3700mAh",
            display: { size: "6.7 inch (Main), 3.4 inch (Cover)", type: "Dynamic AMOLED 2X", resolution: "2640 x 1080 pixels" },
            camera: { rear: "12MP Wide + 12MP Ultra Wide", front: "10MP" },
            charging: "25W, Wireless 15W",
            os: "Android 13, One UI 5.1.1, nâng cấp One UI 6",
            weight: "187g",
        },
        variants: [
            { color: "Tím Lavender", storage: "256GB", sku: "ZFL5-PP-256", stock: 40 },
            { color: "Xanh Mint", storage: "256GB", sku: "ZFL5-MN-256", stock: 35 },
            { color: "Kem", storage: "256GB", sku: "ZFL5-CR-256", stock: 30 },
        ],
        descriptionHTMLSafe: `
      <h3>Galaxy Z Flip5 - Thời trang gập đôi</h3>
      <p>Z Flip5 với màn hình phụ 3.4 inch lớn nhất, gập lại vừa túi, mở ra sành điệu.</p>
      <ul>
        <li>Màn hình phụ Flex Window 3.4 inch lớn gấp 4 lần trước</li>
        <li>Dùng app, xem video, nhắn tin ngay trên màn hình phụ</li>
        <li>Thiết kế thời trang, nhiều màu sắc trendy</li>
        <li>Camera kép 12MP chụp ảnh selfie với màn hình phụ</li>
        <li>Gập lại vừa túi quần, nhẹ chỉ 187g</li>
        <li>Bản lề gập 200,000 lần siêu bền</li>
      </ul>
    `,
    },
    // Samsung A55
    "samsung-galaxy-a55": {
        id: "14",
        slug: "samsung-galaxy-a55",
        name: "Samsung Galaxy A55 5G 8GB 128GB",
        brand: "Samsung",
        price: 9990000,
        salePrice: 8990000,
        thumbnail: getImage("samsung-galaxy-a55", "Samsung"),
        rating: 4.4,
        ratingCount: 256,
        isHot: true,
        gallery: getGallery("samsung-galaxy-a55", "Samsung", 5),
        specs: {
            chipset: "Exynos 1480",
            ram: "8GB",
            rom: "128GB",
            battery: "5000mAh",
            display: { size: "6.6 inch", type: "Super AMOLED", resolution: "2340 x 1080 pixels (FHD+)" },
            camera: { rear: "50MP OIS Wide + 12MP Ultra Wide + 5MP Macro", front: "32MP" },
            charging: "25W",
            os: "Android 14, One UI 6",
            weight: "213g",
        },
        variants: [
            { color: "Xanh Navy", storage: "128GB", sku: "A55-NV-128", stock: 50 },
            { color: "Tím Lilac", storage: "128GB", sku: "A55-PP-128", stock: 45 },
            { color: "Xanh Lá", storage: "128GB", sku: "A55-GN-128", stock: 40 },
        ],
        descriptionHTMLSafe: `
      <h3>Galaxy A55 - Tầm trung đáng mua nhất 2024</h3>
      <p>A55 với khung kim loại cao cấp, camera OIS và hiệu năng mạnh, là lựa chọn số 1 phân khúc tầm trung.</p>
      <ul>
        <li>Khung kim loại nguyên khối sang trọng như flagship</li>
        <li>Camera chính 50MP OIS chống rung quang học</li>
        <li>Exynos 1480 mạnh mẽ, chơi game mượt mà</li>
        <li>Màn hình Super AMOLED 120Hz sống động</li>
        <li>Pin 5000mAh dùng cả ngày</li>
        <li>IP67 chống nước chống bụi</li>
      </ul>
    `,
    },
    // Samsung A35
    "samsung-galaxy-a35": {
        id: "15",
        slug: "samsung-galaxy-a35",
        name: "Samsung Galaxy A35 5G 8GB 128GB",
        brand: "Samsung",
        price: 7490000,
        thumbnail: getImage("samsung-galaxy-a35", "Samsung"),
        rating: 4.3,
        ratingCount: 198,
        gallery: getGallery("samsung-galaxy-a35", "Samsung", 5),
        specs: {
            chipset: "Exynos 1380",
            ram: "8GB",
            rom: "128GB",
            battery: "5000mAh",
            display: { size: "6.6 inch", type: "Super AMOLED", resolution: "2340 x 1080 pixels (FHD+)" },
            camera: { rear: "50MP Wide + 8MP Ultra Wide + 5MP Macro", front: "13MP" },
            charging: "25W",
            os: "Android 14, One UI 6",
            weight: "209g",
        },
        variants: [
            { color: "Tím Lilac", storage: "128GB", sku: "A35-PP-128", stock: 50 },
            { color: "Xanh Navy", storage: "128GB", sku: "A35-NV-128", stock: 45 },
            { color: "Xám", storage: "128GB", sku: "A35-GR-128", stock: 40 },
        ],
        descriptionHTMLSafe: `
      <h3>Galaxy A35 - Phổ thông cao cấp</h3>
      <p>A35 mang đến trải nghiệm cao cấp với màn hình Super AMOLED đẹp và pin lâu, giá rất hợp lý.</p>
      <ul>
        <li>Màn hình Super AMOLED 120Hz sắc nét</li>
        <li>Camera 50MP chụp ảnh chi tiết ban ngày</li>
        <li>Pin 5000mAh, sạc nhanh 25W</li>
        <li>Thiết kế hiện đại với khung nhựa cao cấp</li>
        <li>IP67 chống nước chống bụi chuẩn quân đội</li>
        <li>Giá tốt nhất phân khúc dưới 8 triệu</li>
      </ul>
    `,
    },
    // Samsung M34
    "samsung-galaxy-m34": {
        id: "16",
        slug: "samsung-galaxy-m34",
        name: "Samsung Galaxy M34 5G 8GB 128GB",
        brand: "Samsung",
        price: 6490000,
        thumbnail: getImage("samsung-galaxy-m34", "Samsung"),
        rating: 4.2,
        ratingCount: 167,
        gallery: getGallery("samsung-galaxy-m34", "Samsung", 5),
        specs: {
            chipset: "Exynos 1280",
            ram: "8GB",
            rom: "128GB",
            battery: "6000mAh",
            display: { size: "6.5 inch", type: "Super AMOLED", resolution: "2340 x 1080 pixels (FHD+)" },
            camera: { rear: "50MP Wide + 8MP Ultra Wide + 2MP Macro", front: "13MP" },
            charging: "25W",
            os: "Android 13, One UI 5.1",
            weight: "208g",
        },
        variants: [
            { color: "Xanh", storage: "128GB", sku: "M34-BL-128", stock: 50 },
            { color: "Đen", storage: "128GB", sku: "M34-BK-128", stock: 45 },
        ],
        descriptionHTMLSafe: `
      <h3>Galaxy M34 - Vua pin 6000mAh</h3>
      <p>M34 với viên pin khủng 6000mAh, màn hình Super AMOLED đẹp và giá rất phải chăng.</p>
      <ul>
        <li>Pin 6000mAh - lớn nhất dòng Galaxy, dùng 2 ngày</li>
        <li>Màn hình Super AMOLED 120Hz như flagship</li>
        <li>Camera 50MP chất lượng tốt</li>
        <li>Sạc nhanh 25W đầy pin nhanh chóng</li>
        <li>RAM 8GB mượt mà đa nhiệm</li>
        <li>Giá cực tốt dưới 7 triệu</li>
      </ul>
    `,
    },
    // Xiaomi 14
    "xiaomi-14": {
        id: "17",
        slug: "xiaomi-14",
        name: "Xiaomi 14 12GB 256GB",
        brand: "Xiaomi",
        price: 18990000,
        salePrice: 17490000,
        thumbnail: getImage("xiaomi-14", "Xiaomi"),
        rating: 4.5,
        ratingCount: 189,
        isNew: true,
        gallery: getGallery("xiaomi-14", "Xiaomi", 5),
        specs: {
            chipset: "Snapdragon 8 Gen 3",
            ram: "12GB",
            rom: "256GB",
            battery: "4610mAh",
            display: { size: "6.36 inch", type: "AMOLED LTPO", resolution: "2670 x 1200 pixels" },
            camera: { rear: "50MP Leica + 50MP Telephoto + 50MP Ultra Wide", front: "32MP" },
            charging: "90W HyperCharge, Wireless 50W",
            os: "Android 14, HyperOS",
            weight: "188g",
        },
        variants: [
            { color: "Đen Jade", storage: "256GB", sku: "X14-BK-256", stock: 45 },
            { color: "Trắng Snow", storage: "256GB", sku: "X14-WH-256", stock: 40 },
        ],
        descriptionHTMLSafe: `
      <h3>Xiaomi 14 - Flagship compact với Leica</h3>
      <p>Xiaomi 14 là flagship nhỏ gọn với 3 camera Leica 50MP và chip Snapdragon 8 Gen 3 mạnh nhất.</p>
      <ul>
        <li>Snapdragon 8 Gen 3 - chip mạnh nhất hiện nay</li>
        <li>3 camera Leica 50MP chuyên nghiệp</li>
        <li>Sạc siêu nhanh 90W, đầy 100% trong 18 phút</li>
        <li>Màn hình AMOLED LTPO 120Hz sáng 3000 nits</li>
        <li>Thiết kế compact 6.36 inch dễ cầm</li>
        <li>HyperOS mới mượt mà, ổn định</li>
      </ul>
    `,
    },
    // Xiaomi 13T Pro
    "xiaomi-13t-pro": {
        id: "18",
        slug: "xiaomi-13t-pro",
        name: "Xiaomi 13T Pro 12GB 256GB",
        brand: "Xiaomi",
        price: 13990000,
        salePrice: 12490000,
        thumbnail: getImage("xiaomi-13t-pro", "Xiaomi"),
        rating: 4.4,
        ratingCount: 234,
        gallery: getGallery("xiaomi-13t-pro", "Xiaomi", 5),
        specs: {
            chipset: "MediaTek Dimensity 9200+",
            ram: "12GB",
            rom: "256GB",
            battery: "5000mAh",
            display: { size: "6.67 inch", type: "AMOLED CrystalRes", resolution: "2712 x 1220 pixels" },
            camera: { rear: "50MP Leica + 50MP Telephoto 2x + 12MP Ultra Wide", front: "20MP" },
            charging: "120W HyperCharge",
            os: "Android 13, MIUI 14",
            weight: "206g",
        },
        variants: [
            { color: "Xanh Meadow", storage: "256GB", sku: "X13TP-BL-256", stock: 40 },
            { color: "Đen Alpine", storage: "256GB", sku: "X13TP-BK-256", stock: 38 },
        ],
        descriptionHTMLSafe: `
      <h3>Xiaomi 13T Pro - Sạc nhanh nhất thế giới</h3>
      <p>13T Pro với sạc siêu tốc 120W và camera Leica chuyên nghiệp, hiệu năng Dimensity 9200+ mạnh mẽ.</p>
      <ul>
        <li>Sạc 120W HyperCharge - đầy 100% trong 19 phút!</li>
        <li>Camera Leica với chế độ Leica Authentic & Vibrant</li>
        <li>Dimensity 9200+ 4nm cực mạnh</li>
        <li>Màn hình 144Hz mượt mà nhất phân khúc</li>
        <li>Pin 5000mAh dùng cả ngày</li>
        <li>Giá cực tốt sau giảm giá</li>
      </ul>
    `,
    },
    // Redmi Note 13 Pro+
    "xiaomi-redmi-note-13-pro-plus": {
        id: "19",
        slug: "xiaomi-redmi-note-13-pro-plus",
        name: "Xiaomi Redmi Note 13 Pro+ 8GB 256GB",
        brand: "Xiaomi",
        price: 9990000,
        salePrice: 8990000,
        thumbnail: getImage("xiaomi-redmi-note-13-pro-plus", "Xiaomi"),
        rating: 4.5,
        ratingCount: 312,
        isHot: true,
        gallery: getGallery("xiaomi-redmi-note-13-pro-plus", "Xiaomi", 5),
        specs: {
            chipset: "MediaTek Dimensity 7200 Ultra",
            ram: "8GB",
            rom: "256GB",
            battery: "5000mAh",
            display: { size: "6.67 inch", type: "AMOLED CrystalRes", resolution: "2712 x 1220 pixels" },
            camera: { rear: "200MP Wide + 8MP Ultra Wide + 2MP Macro", front: "16MP" },
            charging: "120W HyperCharge",
            os: "Android 13, MIUI 14 for Redmi",
            weight: "204g",
        },
        variants: [
            { color: "Tím Lavender", storage: "256GB", sku: "RN13PP-PP-256", stock: 50 },
            { color: "Đen Midnight", storage: "256GB", sku: "RN13PP-BK-256", stock: 45 },
            { color: "Xanh Ocean", storage: "256GB", sku: "RN13PP-BL-256", stock: 40 },
        ],
        descriptionHTMLSafe: `
      <h3>Redmi Note 13 Pro+ - Camera 200MP đỉnh cao</h3>
      <p>Note 13 Pro+ với camera 200MP siêu phân giải và sạc nhanh 120W, là vua tầm trung 2024.</p>
      <ul>
        <li>Camera 200MP Samsung HP3 - chụp ảnh siêu chi tiết</li>
        <li>Sạc nhanh 120W đầy pin trong 19 phút</li>
        <li>Màn hình AMOLED 120Hz sáng 1800 nits</li>
        <li>Dimensity 7200 Ultra mạnh mẽ</li>
        <li>IP68 chống nước chuẩn quân đội</li>
        <li>Giá không thể tốt hơn dưới 9 triệu</li>
      </ul>
    `,
    },
    // Redmi Note 13 Pro
    "xiaomi-redmi-note-13-pro": {
        id: "20",
        slug: "xiaomi-redmi-note-13-pro",
        name: "Xiaomi Redmi Note 13 Pro 8GB 128GB",
        brand: "Xiaomi",
        price: 7990000,
        thumbnail: getImage("xiaomi-redmi-note-13-pro", "Xiaomi"),
        rating: 4.3,
        ratingCount: 267,
        gallery: getGallery("xiaomi-redmi-note-13-pro", "Xiaomi", 5),
        specs: {
            chipset: "Snapdragon 7s Gen 2",
            ram: "8GB",
            rom: "128GB",
            battery: "5100mAh",
            display: { size: "6.67 inch", type: "AMOLED", resolution: "2712 x 1220 pixels" },
            camera: { rear: "200MP Wide + 8MP Ultra Wide + 2MP Macro", front: "16MP" },
            charging: "67W",
            os: "Android 13, MIUI 14 for Redmi",
            weight: "199g",
        },
        variants: [
            { color: "Xanh Ocean", storage: "128GB", sku: "RN13P-BL-128", stock: 50 },
            { color: "Đen Midnight", storage: "128GB", sku: "RN13P-BK-128", stock: 45 },
            { color: "Trắng Frost", storage: "128GB", sku: "RN13P-WH-128", stock: 40 },
        ],
        descriptionHTMLSafe: `
      <h3>Redmi Note 13 Pro - Tầm trung quốc dân</h3>
      <p>Note 13 Pro với camera 200MP và sạc nhanh 67W, lựa chọn tuyệt vời dưới 8 triệu.</p>
      <ul>
        <li>Camera chính 200MP cực khủng</li>
        <li>Snapdragon 7s Gen 2 hiệu năng tốt</li>
        <li>Pin 5100mAh, sạc nhanh 67W</li>
        <li>Màn hình AMOLED 120Hz đẹp</li>
        <li>IP54 chống nước nhẹ</li>
        <li>Giá rất hợp lý cho sinh viên</li>
      </ul>
    `,
    },
    // Redmi 13C
    "xiaomi-redmi-13c": {
        id: "21",
        slug: "xiaomi-redmi-13c",
        name: "Xiaomi Redmi 13C 6GB 128GB",
        brand: "Xiaomi",
        price: 3490000,
        salePrice: 2990000,
        thumbnail: getImage("xiaomi-redmi-13c", "Xiaomi"),
        rating: 4.1,
        ratingCount: 198,
        gallery: getGallery("xiaomi-redmi-13c", "Xiaomi", 5),
        specs: {
            chipset: "MediaTek Helio G85",
            ram: "6GB",
            rom: "128GB",
            battery: "5000mAh",
            display: { size: "6.74 inch", type: "IPS LCD", resolution: "1600 x 720 pixels (HD+)" },
            camera: { rear: "50MP Wide + 2MP Depth", front: "8MP" },
            charging: "18W",
            os: "Android 13, MIUI 14 for Redmi",
            weight: "192g",
        },
        variants: [
            { color: "Đen Midnight", storage: "128GB", sku: "R13C-BK-128", stock: 50 },
            { color: "Xanh Navy", storage: "128GB", sku: "R13C-BL-128", stock: 45 },
            { color: "Xanh Lá Clover", storage: "128GB", sku: "R13C-GN-128", stock: 40 },
        ],
        descriptionHTMLSafe: `
      <h3>Redmi 13C - Giá rẻ nhất có 6GB RAM</h3>
      <p>13C với 6GB RAM, camera 50MP và pin 5000mAh, là smartphone giá rẻ đáng mua nhất.</p>
      <ul>
        <li>Giá cực rẻ chỉ dưới 3 triệu sau giảm</li>
        <li>6GB RAM cho đa nhiệm mượt mà</li>
        <li>Pin 5000mAh dùng cả ngày dài</li>
        <li>Camera 50MP chất lượng ổn</li>
        <li>Màn hình lớn 6.74 inch</li>
        <li>Lựa chọn tốt nhất cho học sinh</li>
      </ul>
    `,
    },
    // POCO X6 Pro
    "xiaomi-poco-x6-pro": {
        id: "22",
        slug: "xiaomi-poco-x6-pro",
        name: "Xiaomi POCO X6 Pro 12GB 256GB",
        brand: "Xiaomi",
        price: 9490000,
        salePrice: 8490000,
        thumbnail: getImage("xiaomi-poco-x6-pro", "Xiaomi"),
        rating: 4.4,
        ratingCount: 156,
        gallery: getGallery("xiaomi-poco-x6-pro", "Xiaomi", 5),
        specs: {
            chipset: "MediaTek Dimensity 8300 Ultra",
            ram: "12GB",
            rom: "256GB",
            battery: "5000mAh",
            display: { size: "6.67 inch", type: "AMOLED CrystalRes", resolution: "2712 x 1220 pixels" },
            camera: { rear: "64MP OIS Wide + 8MP Ultra Wide + 2MP Macro", front: "16MP" },
            charging: "67W Turbo",
            os: "Android 14, HyperOS",
            weight: "186g",
        },
        variants: [
            { color: "Vàng Yellow", storage: "256GB", sku: "PX6P-YL-256", stock: 45 },
            { color: "Đen Black", storage: "256GB", sku: "PX6P-BK-256", stock: 40 },
            { color: "Xám Gray", storage: "256GB", sku: "PX6P-GR-256", stock: 38 },
        ],
        descriptionHTMLSafe: `
      <h3>POCO X6 Pro - Gaming phone giá tốt</h3>
      <p>X6 Pro với chip Dimensity 8300 Ultra cực mạnh và RAM 12GB, là máy chơi game tốt nhất tầm giá.</p>
      <ul>
        <li>Dimensity 8300 Ultra - hiệu năng ngang Snapdragon 8 Gen 2</li>
        <li>12GB RAM LPDDR5X siêu nhanh</li>
        <li>Màn hình 120Hz, độ sáng 1800 nits</li>
        <li>Camera 64MP OIS chống rung</li>
        <li>Sạc nhanh 67W</li>
        <li>Giá cực tốt cho cấu hình khủng</li>
      </ul>
    `,
    },
    // POCO F5
    "xiaomi-poco-f5": {
        id: "23",
        slug: "xiaomi-poco-f5",
        name: "Xiaomi POCO F5 8GB 256GB",
        brand: "Xiaomi",
        price: 7990000,
        thumbnail: getImage("xiaomi-poco-f5", "Xiaomi"),
        rating: 4.3,
        ratingCount: 134,
        gallery: getGallery("xiaomi-poco-f5", "Xiaomi", 5),
        specs: {
            chipset: "Snapdragon 7+ Gen 2",
            ram: "8GB",
            rom: "256GB",
            battery: "5000mAh",
            display: { size: "6.67 inch", type: "AMOLED Flow", resolution: "2400 x 1080 pixels (FHD+)" },
            camera: { rear: "64MP OIS Wide + 8MP Ultra Wide + 2MP Macro", front: "16MP" },
            charging: "67W Turbo",
            os: "Android 13, MIUI 14 for POCO",
            weight: "181g",
        },
        variants: [
            { color: "Trắng Snowstorm", storage: "256GB", sku: "PF5-WH-256", stock: 50 },
            { color: "Đen Carbon", storage: "256GB", sku: "PF5-BK-256", stock: 45 },
        ],
        descriptionHTMLSafe: `
      <h3>POCO F5 - Snapdragon mạnh giá rẻ</h3>
      <p>F5 với Snapdragon 7+ Gen 2 chơi game mượt, camera OIS và giá cực tốt dưới 8 triệu.</p>
      <ul>
        <li>Snapdragon 7+ Gen 2 mạnh mẽ cho gaming</li>
        <li>Camera 64MP OIS chống rung quang học</li>
        <li>Màn hình AMOLED 120Hz đẹp</li>
        <li>Pin 5000mAh, sạc 67W</li>
        <li>Nhẹ chỉ 181g, dễ cầm</li>
        <li>Giá phải chăng cho sinh viên</li>
      </ul>
    `,
    },
    // OPPO Find N3
    "oppo-find-n3": {
        id: "24",
        slug: "oppo-find-n3",
        name: "OPPO Find N3 12GB 256GB",
        brand: "OPPO",
        price: 24990000,
        salePrice: 22990000,
        thumbnail: getImage("oppo-find-n3", "OPPO"),
        rating: 4.6,
        ratingCount: 87,
        gallery: getGallery("oppo-find-n3", "OPPO", 5),
        specs: {
            chipset: "Snapdragon 8 Gen 2",
            ram: "12GB",
            rom: "256GB",
            battery: "4805mAh",
            display: { size: "7.82 inch (Main), 6.31 inch (Cover)", type: "AMOLED LTPO", resolution: "2268 x 2440 pixels" },
            camera: { rear: "48MP Hasselblad + 48MP Ultra Wide + 64MP Periscope 3x", front: "20MP Cover + 32MP Inner" },
            charging: "67W SuperVOOC",
            os: "Android 13, ColorOS 13.2",
            weight: "245g",
        },
        variants: [
            { color: "Xanh Classic", storage: "256GB", sku: "FN3-BL-256", stock: 30 },
            { color: "Vàng Gold", storage: "256GB", sku: "FN3-GL-256", stock: 25 },
        ],
        descriptionHTMLSafe: `
      <h3>OPPO Find N3 - Foldable đỉnh cao với Hasselblad</h3>
      <p>Find N3 với màn hình gập 7.82 inch, 3 camera Hasselblad và thiết kế gọn nhẹ nhất phân khúc.</p>
      <ul>
        <li>Màn hình chính 7.82 inch lớn nhất trong foldable</li>
        <li>3 camera Hasselblad chuyên nghiệp</li>
        <li>Gập mở mượt mà với bản lề Flexion</li>
        <li>Snapdragon 8 Gen 2 siêu mạnh</li>
        <li>Sạc nhanh 67W SuperVOOC</li>
        <li>Thiết kế mỏng nhẹ hơn Z Fold</li>
      </ul>
    `,
    },
    // OPPO Reno11 Pro
    "oppo-reno11-pro": {
        id: "25",
        slug: "oppo-reno11-pro",
        name: "OPPO Reno11 Pro 5G 12GB 256GB",
        brand: "OPPO",
        price: 12990000,
        salePrice: 11990000,
        thumbnail: getImage("oppo-reno11-pro", "OPPO"),
        rating: 4.4,
        ratingCount: 145,
        gallery: getGallery("oppo-reno11-pro", "OPPO", 5),
        specs: {
            chipset: "MediaTek Dimensity 8200",
            ram: "12GB",
            rom: "256GB",
            battery: "4600mAh",
            display: { size: "6.7 inch", type: "AMOLED", resolution: "2412 x 1080 pixels (FHD+)" },
            camera: { rear: "50MP IMX890 + 32MP Portrait + 8MP Ultra Wide", front: "32MP" },
            charging: "80W SuperVOOC",
            os: "Android 14, ColorOS 14",
            weight: "190g",
        },
        variants: [
            { color: "Xanh Rock", storage: "256GB", sku: "R11P-BL-256", stock: 40 },
            { color: "Xám Wave", storage: "256GB", sku: "R11P-GR-256", stock: 35 },
        ],
        descriptionHTMLSafe: `
      <h3>Reno11 Pro - Chuyên gia chân dung</h3>
      <p>Reno11 Pro với camera chân dung chuyên dụng 32MP và sạc siêu nhanh 80W.</p>
      <ul>
        <li>Camera chân dung 32MP 2x chuyên dụng</li>
        <li>Chế độ Portrait Master AI tự động làm đẹp</li>
        <li>Sạc siêu nhanh 80W đầy pin trong 28 phút</li>
        <li>Dimensity 8200 mạnh mẽ</li>
        <li>Màn hình AMOLED 120Hz cong 3D</li>
        <li>Thiết kế mỏng nhẹ 7.59mm, 190g</li>
      </ul>
    `,
    },
    // OPPO A78
    "oppo-a78": {
        id: "26",
        slug: "oppo-a78",
        name: "OPPO A78 8GB 128GB",
        brand: "OPPO",
        price: 6490000,
        thumbnail: getImage("oppo-a78", "OPPO"),
        rating: 4.2,
        ratingCount: 178,
        gallery: getGallery("oppo-a78", "OPPO", 5),
        specs: {
            chipset: "Snapdragon 680",
            ram: "8GB",
            rom: "128GB",
            battery: "5000mAh",
            display: { size: "6.43 inch", type: "AMOLED", resolution: "2400 x 1080 pixels (FHD+)" },
            camera: { rear: "50MP Wide + 2MP Depth", front: "8MP" },
            charging: "67W SuperVOOC",
            os: "Android 13, ColorOS 13.1",
            weight: "180g",
        },
        variants: [
            { color: "Xanh Glowing", storage: "128GB", sku: "A78-BL-128", stock: 50 },
            { color: "Đen Glowing", storage: "128GB", sku: "A78-BK-128", stock: 45 },
        ],
        descriptionHTMLSafe: `
      <h3>OPPO A78 - Sạc nhanh 67W giá rẻ</h3>
      <p>A78 với màn hình AMOLED đẹp và sạc nhanh 67W ở mức giá cực tốt dưới 7 triệu.</p>
      <ul>
        <li>Sạc siêu nhanh 67W ở phân khúc giá rẻ</li>
        <li>Màn hình AMOLED 90Hz sống động</li>
        <li>Thiết kế Glow Design lấp lánh độc đáo</li>
        <li>Pin 5000mAh dùng cả ngày</li>
        <li>Mỏng nhẹ chỉ 180g</li>
        <li>Giá tốt cho AMOLED + sạc nhanh</li>
      </ul>
    `,
    },
    // Vivo X100 Pro
    "vivo-x100-pro": {
        id: "27",
        slug: "vivo-x100-pro",
        name: "Vivo X100 Pro 16GB 512GB",
        brand: "Vivo",
        price: 24990000,
        salePrice: 22990000,
        thumbnail: getImage("vivo-x100-pro", "Vivo"),
        rating: 4.5,
        ratingCount: 112,
        isNew: true,
        gallery: getGallery("vivo-x100-pro", "Vivo", 5),
        specs: {
            chipset: "MediaTek Dimensity 9300",
            ram: "16GB",
            rom: "512GB",
            battery: "5400mAh",
            display: { size: "6.78 inch", type: "AMOLED LTPO", resolution: "2800 x 1260 pixels" },
            camera: { rear: "50MP IMX989 + 50MP Ultra Wide + 50MP APO Telephoto Zeiss", front: "32MP" },
            charging: "100W, Wireless 50W",
            os: "Android 14, Funtouch OS 14",
            weight: "221g",
        },
        variants: [
            { color: "Xanh Asteroid", storage: "512GB", sku: "X100P-BL-512", stock: 35 },
            { color: "Đen Startrail", storage: "512GB", sku: "X100P-BK-512", stock: 30 },
        ],
        descriptionHTMLSafe: `
      <h3>Vivo X100 Pro - Camera Zeiss đỉnh cao</h3>
      <p>X100 Pro với 3 camera 50MP Zeiss, chip Dimensity 9300 và pin khủng 5400mAh.</p>
      <ul>
        <li>3 camera 50MP Zeiss APO Telephoto siêu sắc nét</li>
        <li>Cảm biến IMX989 1 inch lớn nhất smartphone</li>
        <li>Dimensity 9300 - chip flagship mạnh nhất MediaTek</li>
        <li>Pin 5400mAh, sạc nhanh 100W</li>
        <li>Màn hình AMOLED LTPO 120Hz sáng 3000 nits</li>
        <li>16GB RAM + 512GB ROM khủng</li>
      </ul>
    `,
    },
    // Vivo V29e
    "vivo-v29e": {
        id: "28",
        slug: "vivo-v29e",
        name: "Vivo V29e 12GB 256GB",
        brand: "Vivo",
        price: 8490000,
        salePrice: 7490000,
        thumbnail: getImage("vivo-v29e", "Vivo"),
        rating: 4.3,
        ratingCount: 156,
        gallery: getGallery("vivo-v29e", "Vivo", 5),
        specs: {
            chipset: "Snapdragon 695",
            ram: "12GB",
            rom: "256GB",
            battery: "4800mAh",
            display: { size: "6.67 inch", type: "AMOLED", resolution: "2400 x 1080 pixels (FHD+)" },
            camera: { rear: "64MP OIS Wide + 8MP Ultra Wide + 2MP Macro", front: "50MP Eye Autofocus" },
            charging: "66W FlashCharge",
            os: "Android 13, Funtouch OS 13",
            weight: "186g",
        },
        variants: [
            { color: "Tím Artistic", storage: "256GB", sku: "V29E-PP-256", stock: 45 },
            { color: "Xanh Breeze", storage: "256GB", sku: "V29E-BL-256", stock: 40 },
        ],
        descriptionHTMLSafe: `
      <h3>Vivo V29e - Selfie đỉnh cao 50MP</h3>
      <p>V29e chuyên selfie với camera trước 50MP Eye Autofocus và thiết kế mỏng nhẹ sang trọng.</p>
      <ul>
        <li>Camera selfie 50MP Eye Autofocus lấy nét mắt</li>
        <li>Aura Light LED kép chiếu sáng selfie chuyên nghiệp</li>
        <li>Thiết kế mỏng 7.57mm, nhẹ 186g</li>
        <li>Camera sau 64MP OIS chống rung</li>
        <li>Sạc nhanh 66W đầy pin 50% trong 18 phút</li>
        <li>12GB RAM mượt mà đa nhiệm</li>
      </ul>
    `,
    },
    // Vivo Y36
    "vivo-y36": {
        id: "29",
        slug: "vivo-y36",
        name: "Vivo Y36 8GB 128GB",
        brand: "Vivo",
        price: 5990000,
        thumbnail: getImage("vivo-y36", "Vivo"),
        rating: 4.1,
        ratingCount: 198,
        gallery: getGallery("vivo-y36", "Vivo", 5),
        specs: {
            chipset: "Snapdragon 680",
            ram: "8GB",
            rom: "128GB",
            battery: "5000mAh",
            display: { size: "6.64 inch", type: "IPS LCD", resolution: "2388 x 1080 pixels (FHD+)" },
            camera: { rear: "50MP Wide + 2MP Depth", front: "16MP" },
            charging: "44W FlashCharge",
            os: "Android 13, Funtouch OS 13",
            weight: "202g",
        },
        variants: [
            { color: "Xanh Meteor", storage: "128GB", sku: "Y36-BL-128", stock: 50 },
            { color: "Vàng Glitter", storage: "128GB", sku: "Y36-GL-128", stock: 45 },
        ],
        descriptionHTMLSafe: `
      <h3>Vivo Y36 - Pin trâu giá tốt</h3>
      <p>Y36 với pin 5000mAh, sạc nhanh 44W và thiết kế trẻ trung, phù hợp sinh viên.</p>
      <ul>
        <li>Pin 5000mAh dùng cả ngày</li>
        <li>Sạc nhanh 44W đầy pin nhanh</li>
        <li>Màn hình lớn 6.64 inch FHD+</li>
        <li>Camera 50MP chất lượng tốt</li>
        <li>8GB RAM + 8GB RAM mở rộng</li>
        <li>Giá rẻ dưới 6 triệu</li>
      </ul>
    `,
    },
    // Vivo Y17s
    "vivo-y17s": {
        id: "30",
        slug: "vivo-y17s",
        name: "Vivo Y17s 6GB 128GB",
        brand: "Vivo",
        price: 3990000,
        salePrice: 3490000,
        thumbnail: getImage("vivo-y17s", "Vivo"),
        rating: 4.0,
        ratingCount: 167,
        gallery: getGallery("vivo-y17s", "Vivo", 5),
        specs: {
            chipset: "MediaTek Helio G85",
            ram: "6GB",
            rom: "128GB",
            battery: "5000mAh",
            display: { size: "6.56 inch", type: "IPS LCD", resolution: "1612 x 720 pixels (HD+)" },
            camera: { rear: "50MP Wide + 2MP Depth", front: "8MP" },
            charging: "15W",
            os: "Android 13, Funtouch OS 13",
            weight: "186g",
        },
        variants: [
            { color: "Tím Glitter", storage: "128GB", sku: "Y17S-PP-128", stock: 50 },
            { color: "Xanh Breeze", storage: "128GB", sku: "Y17S-BL-128", stock: 45 },
        ],
        descriptionHTMLSafe: `
      <h3>Vivo Y17s - Entry level đáng mua</h3>
      <p>Y17s với pin lớn 5000mAh và giá cực tốt dưới 4 triệu, lựa chọn số 1 cho học sinh.</p>
      <ul>
        <li>Giá siêu rẻ chỉ 3.4 triệu sau giảm</li>
        <li>Pin 5000mAh dùng rất lâu</li>
        <li>Camera 50MP đủ dùng</li>
        <li>6GB RAM + 6GB RAM mở rộng</li>
        <li>Màn hình lớn 6.56 inch</li>
        <li>Phù hợp học sinh, người lớn tuổi</li>
      </ul>
    `,
    },
};

export const MOCK_REVIEWS: Record<string, Review[]> = {
    "1": [
        {
            id: "r1",
            user: { name: "Nguyễn Văn A", verifiedPurchase: true },
            rating: 5,
            content:
                "Sản phẩm tuyệt vời! Màn hình đẹp, pin trâu, camera chụp ảnh sắc nét. Rất hài lòng với lần mua hàng này.",
            createdAt: "2024-01-15T10:30:00Z",
            media: [
                { type: "image", url: "/placeholder-review.jpg" },
                { type: "image", url: "/placeholder-review.jpg" },
            ],
        },
        {
            id: "r2",
            user: { name: "Trần Thị B", verifiedPurchase: true },
            rating: 4,
            content: "Điện thoại tốt nhưng giá hơi cao. Nếu có khuyến mãi thì rất đáng mua.",
            createdAt: "2024-01-14T14:20:00Z",
        },
    ],
};


