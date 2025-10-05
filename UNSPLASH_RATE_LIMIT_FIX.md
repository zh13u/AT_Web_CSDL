# ⚠️ Giải Quyết Lỗi Unsplash Rate Limit (503)

## 🔴 Vấn Đề

```
⨯ upstream image response failed for 
https://source.unsplash.com/400x400/?iphone,smartphone&sig=... 503
```

**Nguyên nhân:** 
- Unsplash Source API có **rate limit** ~50 requests/hour
- Website load quá nhiều ảnh cùng lúc → vượt giới hạn
- Trả về HTTP 503 (Service Unavailable)

## ✅ Giải Pháp Ngay Lập Tức

### Cách 1: Đổi Sang SVG Placeholder (ĐÃ ÁP DỤNG)

**File:** `lib/mockData.ts`
```typescript
const IMAGE_SOURCE = 'local'; // ← Đã đổi từ 'unsplash'
```

**Kết quả:**
- ✅ Không còn lỗi 503
- ✅ Ảnh SVG nhẹ, load nhanh
- ✅ Hoạt động offline
- ⚠️ Không đẹp bằng ảnh thật

### Cách 2: Dùng Placehold.co

```typescript
const IMAGE_SOURCE = 'placeholder';
```

**Kết quả:**
- ✅ Không bị rate limit
- ✅ Có text hiển thị brand
- ⚠️ Cần internet

### Cách 3: Đợi Rate Limit Reset

Đợi **1 giờ** rồi thử lại:
```typescript
const IMAGE_SOURCE = 'unsplash';
```

## 🚀 Giải Pháp Lâu Dài

### Option A: Tải Ảnh Về Local

**Bước 1:** Chạy script tải ảnh
```bash
node scripts/downloadImages.js
```

**Bước 2:** Cập nhật `imageHelpers.ts`
```typescript
export function getLocalPlaceholder(filename?: string): string {
  if (filename) {
    return `/images/products/${filename}`;
  }
  return '/placeholder-phone.svg';
}
```

**Bước 3:** Cập nhật `mockData.ts`
```typescript
thumbnail: getLocalPlaceholder('iphone-15-pro-max.jpg'),
```

### Option B: Dùng API Khác

#### Picsum Photos (Không giới hạn)
```typescript
// lib/imageHelpers.ts
export function getPicsumImage(seed: number): string {
  return `https://picsum.photos/seed/${seed}/400/400`;
}

// mockData.ts
const IMAGE_SOURCE = 'picsum';
function getImage(brand: string, name: string, index = 0): string {
  if (IMAGE_SOURCE === 'picsum') {
    const seed = brand.charCodeAt(0) + index;
    return getPicsumImage(seed);
  }
  // ...
}
```

#### Lorem Picsum (Stable)
```typescript
return `https://picsum.photos/id/${id}/400/400`;
```

#### DiceBear Avatars (Brand Icons)
```typescript
return `https://api.dicebear.com/7.x/shapes/svg?seed=${brand}`;
```

### Option C: Upload Lên CDN Riêng

**Miễn phí:**
1. **Cloudinary** - 25GB free
   ```
   https://res.cloudinary.com/your-cloud/image/upload/iphone-15.jpg
   ```

2. **ImgBB** - Unlimited
   ```
   https://i.ibb.co/xxxxx/iphone-15.jpg
   ```

3. **GitHub Pages**
   ```
   https://yourusername.github.io/images/iphone-15.jpg
   ```

## 🔧 Fix Rate Limit Cho Unsplash

### Giảm Số Request

**1. Lazy Load Ảnh**
```tsx
<Image
  src={image}
  alt={name}
  loading="lazy" // ← Thêm này
  placeholder="blur"
/>
```

**2. Giới Hạn Số Sản Phẩm Hiển Thị**
```typescript
// Giảm pageSize từ 24 xuống 12
const pageSize = 12;
```

**3. Cache Ảnh Lâu Hơn**
```javascript
// next.config.js
module.exports = {
  images: {
    minimumCacheTTL: 86400, // 24 hours
  },
};
```

### Dùng Unsplash API Official (Có Account)

**Bước 1:** Đăng ký tại https://unsplash.com/developers

**Bước 2:** Lấy Access Key

**Bước 3:** Dùng API chính thức
```typescript
const UNSPLASH_ACCESS_KEY = process.env.NEXT_PUBLIC_UNSPLASH_KEY;

export async function getUnsplashImage(query: string) {
  const res = await fetch(
    `https://api.unsplash.com/photos/random?query=${query}&client_id=${UNSPLASH_ACCESS_KEY}`
  );
  const data = await res.json();
  return data.urls.small;
}
```

**Rate Limit:** 50 requests/hour → **5000 requests/hour**

## 📊 So Sánh Giải Pháp

| Giải pháp | Rate Limit | Chất lượng | Offline | Setup |
|-----------|------------|------------|---------|-------|
| **Local SVG** | ∞ | ⭐⭐ | ✅ | ⭐⭐⭐⭐⭐ |
| **Placehold.co** | ∞ | ⭐⭐⭐ | ❌ | ⭐⭐⭐⭐⭐ |
| **Picsum** | ∞ | ⭐⭐⭐⭐ | ❌ | ⭐⭐⭐⭐⭐ |
| **Unsplash Source** | 50/h | ⭐⭐⭐⭐⭐ | ❌ | ⭐⭐⭐⭐⭐ |
| **Unsplash API** | 5000/h | ⭐⭐⭐⭐⭐ | ❌ | ⭐⭐⭐ |
| **Local Images** | ∞ | ⭐⭐⭐⭐⭐ | ✅ | ⭐⭐ |
| **CDN** | ∞ | ⭐⭐⭐⭐⭐ | ❌ | ⭐⭐ |

## 🎯 Khuyến Nghị

### Development (Hiện tại)
```typescript
// lib/mockData.ts
const IMAGE_SOURCE = 'local'; // ← Dùng SVG, ổn định
```

### Sau Khi Có Ảnh Thật
```bash
# Tải ảnh về
node scripts/downloadImages.js

# Hoặc copy ảnh thủ công vào public/images/products/
```

### Production
- Upload ảnh lên Cloudinary/S3
- Spring Boot trả URL CDN
- Next.js Image tự optimize

## 🔍 Debug

### Kiểm Tra Rate Limit
```bash
curl -I https://source.unsplash.com/400x400/?iphone
```

Nếu thấy:
```
HTTP/1.1 503 Service Unavailable
X-RateLimit-Remaining: 0
```
→ Đã hết quota, đợi 1 giờ

### Test Từng Nguồn Ảnh

```typescript
// Test local
const IMAGE_SOURCE = 'local';

// Test placeholder
const IMAGE_SOURCE = 'placeholder';

// Test Unsplash (sau 1 giờ)
const IMAGE_SOURCE = 'unsplash';
```

## 💡 Tips

1. **Development:** Dùng local SVG (nhanh, không lỗi)
2. **Demo:** Dùng Picsum (đẹp, không limit)
3. **Production:** Upload CDN (professional)

## 📞 Next Steps

1. ✅ **Ngay:** Đã đổi sang `local` → Website chạy bình thường
2. 📥 **Tùy chọn:** Tải ảnh thật về với script
3. ☁️ **Sau này:** Upload CDN khi deploy production

---

**Kết luận:** Website đã hoạt động bình thường với ảnh SVG placeholder! 🎉
