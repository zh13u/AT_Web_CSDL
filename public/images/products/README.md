# Hướng dẫn tải và đặt tên ảnh sản phẩm

## Cấu trúc thư mục
```
public/images/products/
├── iphone-15-pro-max/
│   ├── main.jpg          (ảnh chính)
│   ├── gallery-1.jpg     (ảnh góc 1)
│   ├── gallery-2.jpg     (ảnh góc 2)
│   ├── gallery-3.jpg     (ảnh góc 3)
│   └── gallery-4.jpg     (ảnh góc 4)
├── samsung-galaxy-s24-ultra/
│   ├── main.jpg
│   └── gallery-*.jpg
└── ...
```

## Danh sách sản phẩm và tên thư mục

### Apple (6 sản phẩm)
1. **iphone-15-pro-max** - iPhone 15 Pro Max
2. **iphone-15-pro** - iPhone 15 Pro  
3. **iphone-15-plus** - iPhone 15 Plus
4. **iphone-15** - iPhone 15
5. **iphone-14-pro-max** - iPhone 14 Pro Max
6. **iphone-14** - iPhone 14

### Samsung (8 sản phẩm)
7. **samsung-galaxy-s24-ultra** - Galaxy S24 Ultra
8. **samsung-galaxy-s24-plus** - Galaxy S24+
9. **samsung-galaxy-s24** - Galaxy S24
10. **samsung-galaxy-z-fold5** - Galaxy Z Fold5
11. **samsung-galaxy-z-flip5** - Galaxy Z Flip5
12. **samsung-galaxy-a55** - Galaxy A55
13. **samsung-galaxy-a35** - Galaxy A35
14. **samsung-galaxy-m34** - Galaxy M34

### Xiaomi (8 sản phẩm)
15. **xiaomi-14-ultra** - Xiaomi 14 Ultra
16. **xiaomi-14** - Xiaomi 14
17. **xiaomi-13t-pro** - Xiaomi 13T Pro
18. **xiaomi-redmi-note-13-pro-plus** - Redmi Note 13 Pro+
19. **xiaomi-redmi-note-13-pro** - Redmi Note 13 Pro
20. **xiaomi-redmi-13c** - Redmi 13C
21. **xiaomi-poco-x6-pro** - POCO X6 Pro
22. **xiaomi-poco-f5** - POCO F5

### OPPO (4 sản phẩm)
23. **oppo-find-x7-ultra** - Find X7 Ultra
24. **oppo-find-n3** - Find N3
25. **oppo-reno11-pro** - Reno11 Pro
26. **oppo-a78** - A78

### Vivo (4 sản phẩm)
27. **vivo-x100-pro** - X100 Pro
28. **vivo-v29e** - V29e
29. **vivo-y36** - Y36
30. **vivo-y17s** - Y17s

## Cách tải ảnh

### Nguồn ảnh chất lượng cao:
1. **Google Images** - Tìm "[tên sản phẩm] official" hoặc "[tên sản phẩm] png"
2. **GSMArena.com** - Database điện thoại có ảnh chất lượng cao
3. **Trang chính thức** - apple.com, samsung.com, mi.com, oppo.com, vivo.com
4. **Thegioididong.com / FPT Shop** - Ảnh sản phẩm tiếng Việt

### Hướng dẫn tải:
1. Tìm ảnh sản phẩm trên Google: "[Tên sản phẩm] official high quality"
2. Chọn ảnh có nền trắng/trong suốt, độ phân giải cao (ít nhất 800x800px)
3. Tải về và đổi tên theo cấu trúc trên
4. Đặt vào đúng thư mục sản phẩm

### Ví dụ chi tiết cho iPhone 15 Pro Max:

**Bước 1:** Tạo thư mục
```
public/images/products/iphone-15-pro-max/
```

**Bước 2:** Tìm và tải ảnh:
- Tìm Google: "iPhone 15 Pro Max official image white background"
- Tải 5 ảnh: góc trước, góc sau, góc nghiêng, close-up camera, màu sắc khác
- Đổi tên: `main.jpg`, `gallery-1.jpg`, `gallery-2.jpg`, `gallery-3.jpg`, `gallery-4.jpg`

**Bước 3:** Copy vào thư mục
```
public/images/products/iphone-15-pro-max/
├── main.jpg          (ảnh chính - mặt trước)
├── gallery-1.jpg     (mặt sau)
├── gallery-2.jpg     (góc nghiêng)
├── gallery-3.jpg     (close-up camera)
└── gallery-4.jpg     (màu khác)
```

## Format ảnh khuyến nghị:
- **Định dạng**: JPG hoặc PNG (PNG nếu có nền trong suốt)
- **Kích thước**: 800x800px đến 1200x1200px
- **Dung lượng**: < 200KB mỗi ảnh (tối ưu web)
- **Nền**: Trắng hoặc trong suốt
- **Tỷ lệ**: Vuông (1:1) hoặc dọc (3:4)

## Script tự động tạo thư mục

Chạy lệnh PowerShell này để tạo tất cả thư mục:

```powershell
# Tạo thư mục cho tất cả 30 sản phẩm
$products = @(
    "iphone-15-pro-max", "iphone-15-pro", "iphone-15-plus", "iphone-15", "iphone-14-pro-max", "iphone-14",
    "samsung-galaxy-s24-ultra", "samsung-galaxy-s24-plus", "samsung-galaxy-s24", "samsung-galaxy-z-fold5", 
    "samsung-galaxy-z-flip5", "samsung-galaxy-a55", "samsung-galaxy-a35", "samsung-galaxy-m34",
    "xiaomi-14-ultra", "xiaomi-14", "xiaomi-13t-pro", "xiaomi-redmi-note-13-pro-plus", 
    "xiaomi-redmi-note-13-pro", "xiaomi-redmi-13c", "xiaomi-poco-x6-pro", "xiaomi-poco-f5",
    "oppo-find-x7-ultra", "oppo-find-n3", "oppo-reno11-pro", "oppo-a78",
    "vivo-x100-pro", "vivo-v29e", "vivo-y36", "vivo-y17s"
)

foreach ($product in $products) {
    New-Item -ItemType Directory -Force -Path "public/images/products/$product"
    Write-Host "Created: $product"
}
```

## Sau khi tải ảnh xong:

Code sẽ tự động nhận diện và hiển thị ảnh thật thay vì SVG placeholder!
