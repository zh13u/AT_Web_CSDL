# 📷 Hướng Dẫn Thu Thập Ảnh Sản Phẩm

## 🎯 3 Cách Lấy Ảnh Cho Website

### ✅ CÁCH 1: Dùng API Unsplash (KHUYẾN NGHỊ)

**Ưu điểm:**
- ✅ Ảnh đẹp, chất lượng cao, miễn phí
- ✅ Không cần tải về, tự động từ CDN
- ✅ Đa dạng, phù hợp với từng brand

**Cách dùng:**

File `lib/mockData.ts` đã được cấu hình sẵn:
```typescript
const IMAGE_SOURCE: 'unsplash' | 'local' | 'placeholder' = 'unsplash';
```

**Để chuyển đổi nguồn ảnh, thay đổi giá trị:**
- `'unsplash'` - Ảnh thật từ Unsplash
- `'local'` - Ảnh SVG placeholder local
- `'placeholder'` - Ảnh placeholder đơn giản

---

### ✅ CÁCH 2: Tải Ảnh Về Local

**Bước 1:** Chạy script tải ảnh
```bash
node scripts/downloadImages.js
```

Script sẽ tải ảnh về thư mục: `public/images/products/`

**Bước 2:** Cập nhật `lib/mockData.ts`
```typescript
const IMAGE_SOURCE = 'local';
```

**Bước 3:** Sửa `lib/imageHelpers.ts`
```typescript
export function getLocalPlaceholder(filename?: string): string {
  return filename 
    ? `/images/products/${filename}` 
    : '/placeholder-phone.svg';
}
```

---

### ✅ CÁCH 3: Tự Tải Ảnh Thủ Công

#### Option A: Từ Website Chính Hãng
```
1. Vào trang sản phẩm chính hãng
   - Apple: apple.com/iphone
   - Samsung: samsung.com/galaxy
   - Xiaomi: mi.com

2. Click chuột phải vào ảnh → Save Image As
3. Đặt vào: public/images/products/
4. Đổi tên: iphone-15-pro-max.jpg
```

#### Option B: Từ E-Commerce
```
1. Vào trang như:
   - CellphoneS
   - Thế Giới Di Động
   - FPT Shop

2. Tải ảnh sản phẩm chính
3. Lưu vào: public/images/products/
```

#### Option C: Stock Photos (Miễn phí)
- **Unsplash:** https://unsplash.com/s/photos/smartphone
- **Pexels:** https://www.pexels.com/search/phone/
- **Pixabay:** https://pixabay.com/images/search/smartphone/

**Lưu ý:** Kiểm tra license trước khi dùng!

---

## 🛠️ Cấu Trúc Thư Mục

```
public/
  images/
    products/
      iphone-15-pro-max.jpg
      samsung-s24-ultra.jpg
      xiaomi-14-ultra.jpg
      ...
```

---

## 📝 Cách Thêm Ảnh Cho Sản Phẩm Cụ Thể

### 1. Sửa trong `MOCK_PRODUCTS`

```typescript
{
  id: "1",
  name: "iPhone 15 Pro Max",
  brand: "Apple",
  thumbnail: "/images/products/iphone-15-pro-max.jpg", // Đường dẫn ảnh
  // ...
}
```

### 2. Sửa trong `MOCK_PRODUCT_DETAILS`

```typescript
"iphone-15-pro-max": {
  // ...
  thumbnail: "/images/products/iphone-15-pro-max.jpg",
  gallery: [
    "/images/products/iphone-15-pro-max-1.jpg",
    "/images/products/iphone-15-pro-max-2.jpg",
    "/images/products/iphone-15-pro-max-3.jpg",
    "/images/products/iphone-15-pro-max-4.jpg",
  ],
}
```

---

## 🌐 API Services Miễn Phí

### Unsplash Source API
```
https://source.unsplash.com/400x400/?iphone,smartphone
```
- Không cần API key
- Random ảnh mỗi lần load
- Thêm `&sig=SEED` để fix ảnh

### Picsum Photos
```
https://picsum.photos/400/400
```
- Random ảnh placeholder
- Thêm `seed` để fix ảnh

### UI Avatars
```
https://ui-avatars.com/api/?name=iPhone+15&size=400
```
- Tạo ảnh từ text
- Customize màu, font

### Placehold.co
```
https://placehold.co/400x400?text=iPhone
```
- Placeholder đơn giản
- Customize màu, text

---

## ⚡ Quick Start

### Dùng Unsplash (Nhanh nhất)
```typescript
// lib/mockData.ts
const IMAGE_SOURCE = 'unsplash'; // ← Đã set sẵn
```

### Dùng Ảnh Local
```bash
# 1. Tải ảnh về
node scripts/downloadImages.js

# 2. Hoặc copy ảnh thủ công vào public/images/products/

# 3. Đổi config
const IMAGE_SOURCE = 'local';
```

---

## 🚀 Cho Production

### ❌ KHÔNG NÊN:
- Hotlink ảnh từ website khác
- Dùng ảnh không có bản quyền
- Dùng Unsplash API trực tiếp (có rate limit)

### ✅ NÊN:
1. **Upload lên CDN:**
   - AWS S3 + CloudFront
   - Cloudinary (có free tier)
   - Vercel Image Optimization

2. **Backend cung cấp URL:**
   ```json
   {
     "thumbnail": "https://cdn.yourstore.com/products/iphone-15.jpg"
   }
   ```

3. **Next.js tự động optimize:**
   ```tsx
   <Image src="/images/products/iphone.jpg" ... />
   ```

---

## 📊 So Sánh Các Phương Pháp

| Phương pháp | Tốc độ | Chất lượng | Offline | Production |
|-------------|--------|------------|---------|------------|
| Unsplash API | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ❌ | ❌ |
| Local Images | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ✅ | ⚠️ |
| CDN | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ❌ | ✅ |
| SVG Placeholder | ⭐⭐⭐⭐⭐ | ⭐⭐ | ✅ | ⚠️ |

---

## 🔧 Troubleshooting

### Ảnh không hiển thị từ Unsplash?
```bash
# Kiểm tra kết nối mạng
curl https://source.unsplash.com/400x400/?iphone

# Nếu bị chặn, đổi sang local
const IMAGE_SOURCE = 'local';
```

### Script tải ảnh lỗi?
```bash
# Kiểm tra Node.js
node --version  # Cần >= 14

# Tạo thư mục thủ công
mkdir -p public/images/products

# Chạy lại
node scripts/downloadImages.js
```

### Next.js Image optimization error?
```javascript
// next.config.js
module.exports = {
  images: {
    domains: ['source.unsplash.com', 'picsum.photos'],
  },
};
```

---

## 💡 Tips

1. **Optimize ảnh trước khi upload:**
   - TinyPNG: https://tinypng.com
   - Squoosh: https://squoosh.app

2. **Đặt tên file chuẩn:**
   ```
   product-slug.jpg
   iphone-15-pro-max.jpg
   samsung-s24-ultra.jpg
   ```

3. **Dùng WebP cho hiệu năng tốt:**
   ```bash
   # Convert JPG → WebP
   npx @squoosh/cli --webp auto *.jpg
   ```

4. **Lazy load ảnh:**
   - Next.js `<Image>` đã tự động lazy load
   - Không cần config thêm

---

**Khuyến nghị:** Dùng Unsplash cho development, sau đó upload ảnh thật lên CDN khi production! 🚀
