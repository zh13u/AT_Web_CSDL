# 📸 Hệ thống quản lý ảnh sản phẩm

## ✅ Đã hoàn thành

### 1. Tạo 30 thư mục sản phẩm
✓ Tất cả 30 thư mục đã được tạo trong `public/images/products/`

### 2. Cập nhật code tự động nhận diện ảnh
✓ Hệ thống ưu tiên ảnh thật, fallback về SVG nếu chưa có

### 3. Chuẩn bị sẵn SVG placeholder
✓ 5 file SVG đẹp theo từng brand (iPhone, Samsung, Xiaomi, OPPO, Vivo)

## 🚀 Cách sử dụng

### BƯỚC 1: Tải ảnh thật (Không bắt buộc ngay)

**Nếu KHÔNG tải ảnh**: Website sẽ hiển thị SVG placeholder đẹp theo từng brand
**Nếu CÓ tải ảnh**: Website sẽ tự động hiển thị ảnh thật

### BƯỚC 2: Đặt ảnh vào đúng thư mục

#### Mỗi sản phẩm cần 6 file:
```
public/images/products/[slug-san-pham]/
├── main.jpg          (ảnh chính - thumbnail)
├── gallery-0.jpg     (ảnh gallery 1)
├── gallery-1.jpg     (ảnh gallery 2)
├── gallery-2.jpg     (ảnh gallery 3)
├── gallery-3.jpg     (ảnh gallery 4)
└── gallery-4.jpg     (ảnh gallery 5)
```

#### Ví dụ: iPhone 15 Pro Max
```
public/images/products/iphone-15-pro-max/
├── main.jpg          ← Ảnh chính
├── gallery-0.jpg     ← Mặt trước
├── gallery-1.jpg     ← Mặt sau
├── gallery-2.jpg     ← Góc nghiêng
├── gallery-3.jpg     ← Close-up camera
└── gallery-4.jpg     ← Màu khác
```

### BƯỚC 3: Refresh browser
```
Ctrl + Shift + R (hard refresh)
```

## 📋 Danh sách 30 sản phẩm

### Apple (6)
1. `iphone-15-pro-max`
2. `iphone-15-pro`
3. `iphone-15-plus`
4. `iphone-15`
5. `iphone-14-pro-max`
6. `iphone-14`

### Samsung (8)
7. `samsung-galaxy-s24-ultra`
8. `samsung-galaxy-s24-plus`
9. `samsung-galaxy-s24`
10. `samsung-galaxy-z-fold5`
11. `samsung-galaxy-z-flip5`
12. `samsung-galaxy-a55`
13. `samsung-galaxy-a35`
14. `samsung-galaxy-m34`

### Xiaomi (8)
15. `xiaomi-14-ultra`
16. `xiaomi-14`
17. `xiaomi-13t-pro`
18. `xiaomi-redmi-note-13-pro-plus`
19. `xiaomi-redmi-note-13-pro`
20. `xiaomi-redmi-13c`
21. `xiaomi-poco-x6-pro`
22. `xiaomi-poco-f5`

### OPPO (4)
23. `oppo-find-x7-ultra`
24. `oppo-find-n3`
25. `oppo-reno11-pro`
26. `oppo-a78`

### Vivo (4)
27. `vivo-x100-pro`
28. `vivo-v29e`
29. `vivo-y36`
30. `vivo-y17s`

## 🔍 Nguồn tải ảnh

Xem chi tiết trong: **`DOWNLOAD_IMAGES_GUIDE.md`**

### Top nguồn:
1. **Google Images** - "[ tên sản phẩm] official high quality"
2. **GSMArena.com** - Database điện thoại đầy đủ nhất
3. **Trang chính thức** - apple.com, samsung.com, mi.com...
4. **Thegioididong.com** - Ảnh sản phẩm tiếng Việt

## ⚙️ Cấu hình

File: `lib/mockData.ts`
```typescript
const IMAGE_SOURCE: 'real' | 'svg' = 'real';
// 'real' - Dùng ảnh thật, fallback về SVG
// 'svg' - Chỉ dùng SVG placeholder
```

## 📐 Quy cách ảnh

- **Format**: JPG (nếu nền trắng) hoặc PNG (nếu nền trong suốt)
- **Size**: 800x800px đến 1200x1200px
- **File size**: < 200KB (đã nén)
- **Background**: Trắng (#FFFFFF) hoặc trong suốt
- **Ratio**: Vuông (1:1) khuyến nghị

## 💡 Tips

### Tải ảnh nhanh:
```
1. Tìm Google: "[Tên sản phẩm] official png white background"
2. Tools → Size → Large
3. Tải 6 ảnh: main + 5 gallery
4. Đổi tên theo format
5. Copy vào thư mục sản phẩm
```

### Optimize ảnh:
- **TinyPNG**: https://tinypng.com/ (nén ảnh)
- **Remove.bg**: https://www.remove.bg/ (xóa nền)
- **Squoosh**: https://squoosh.app/ (resize & compress)

## 🎯 Ưu tiên tải ảnh

Nếu không muốn tải hết 30 sản phẩm, ưu tiên 5 sản phẩm này trước:

1. ⭐ `iphone-15-pro-max` - Flagship Apple
2. ⭐ `samsung-galaxy-s24-ultra` - Flagship Samsung
3. ⭐ `xiaomi-14-ultra` - Flagship Xiaomi
4. ⭐ `oppo-find-x7-ultra` - Flagship OPPO
5. ⭐ `vivo-x100-pro` - Flagship Vivo

## 📊 Trạng thái hiện tại

- ✅ 30 thư mục đã tạo sẵn
- ✅ Code đã cập nhật tự động nhận diện
- ✅ SVG placeholder đã sẵn sàng
- ⏳ Ảnh thật: Chờ bạn tải về

## 🚨 Lưu ý

### Nếu ảnh không hiển thị:
1. Kiểm tra tên file: `main.jpg` (chữ thường, không dấu cách)
2. Kiểm tra đúng thư mục: `public/images/products/[slug]/`
3. Hard refresh: `Ctrl + Shift + R`
4. Restart dev server: `pnpm dev`

### Fallback logic:
```
1. Thử load ảnh thật từ /images/products/[slug]/main.jpg
2. Nếu 404 → Next.js tự động fallback về SVG placeholder
3. SVG placeholder theo brand (iPhone style, Samsung style...)
```

## 📚 Tài liệu chi tiết

- **Hướng dẫn tải ảnh đầy đủ**: `DOWNLOAD_IMAGES_GUIDE.md`
- **Danh sách sản phẩm**: `public/images/products/README.md`

---

**Tóm lại**: Hiện tại website đã chạy tốt với SVG placeholder. Bạn có thể từ từ tải ảnh thật vào, hệ thống sẽ tự động nhận diện và hiển thị!
