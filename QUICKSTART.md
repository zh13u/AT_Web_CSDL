# 🚀 HƯỚNG DẪN NHANH

## Chạy dự án trong 3 bước:

### Bước 1: Cài đặt dependencies
```bash
pnpm install
```

**Lưu ý**: Nếu chưa cài `pnpm`, chạy:
```bash
npm install -g pnpm
```

Hoặc dùng `npm` / `yarn`:
```bash
npm install
# hoặc
yarn install
```

### Bước 2: Chạy development server
```bash
pnpm dev
```

### Bước 3: Mở trình duyệt
Truy cập: **http://localhost:3000**

---

## 📋 Tính năng đã có

✅ Trang chủ với banner và sản phẩm nổi bật  
✅ Danh sách sản phẩm có bộ lọc (brand, price)  
✅ Sắp xếp (mới nhất, giá, bán chạy)  
✅ Phân trang  
✅ Chi tiết sản phẩm với gallery  
✅ Chọn biến thể (màu, dung lượng, stock)  
✅ Tìm kiếm với autocomplete  
✅ Giỏ hàng (mini drawer + full page)  
✅ Đăng nhập / Đăng ký (mock)  
✅ Toast notifications  
✅ Responsive design  
✅ Loading states (skeleton)  

---

## 🗂️ Cấu trúc đơn giản

```
app/
  api/           ← Mock API (Next.js Route Handlers)
  dien-thoai/    ← Danh sách & chi tiết sản phẩm
  auth/          ← Login, Register
  cart/          ← Giỏ hàng
  page.tsx       ← Trang chủ
  layout.tsx     ← Root layout

components/      ← UI components (Header, Footer, ProductCard...)
lib/             ← Utils, types, mock data
store/           ← Zustand stores (cart, ui)
hooks/           ← Custom hooks
styles/          ← Global CSS + Tailwind
```

---

## 🔧 Scripts

```bash
pnpm dev          # Chạy development (port 3000)
pnpm build        # Build production
pnpm start        # Chạy production build
pnpm lint         # Lint code
```

---

## 🌐 API Endpoints (Mock)

Tất cả API đều chạy local trong `app/api/*`:

- `GET /api/products` - Danh sách sản phẩm (filter, sort, paginate)
- `GET /api/products/[slug]` - Chi tiết sản phẩm
- `GET /api/search?q=...` - Tìm kiếm
- `POST /api/auth/login` - Đăng nhập (mock)
- `POST /api/auth/register` - Đăng ký (mock)
- `GET/POST /api/cart` - Giỏ hàng (mock)
- `POST /api/orders` - Đặt hàng (mock)

**Khi tích hợp Spring Boot**, chỉ cần:

1. Tạo file `.env.local`:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
```

2. File `lib/api.ts` đã sẵn sàng với:
   - `credentials: 'include'` (gửi cookie)
   - CSRF token header `X-XSRF-TOKEN`

---

## 🔒 Bảo mật

Dự án đã tuân thủ best practices:

- ❌ **KHÔNG** dùng `dangerouslySetInnerHTML` (trừ dữ liệu đã sanitize)
- ❌ **KHÔNG** lưu token trong `localStorage`
- ✅ Cookie-based authentication (HttpOnly khi production)
- ✅ CSRF protection ready (khi tích hợp BE)
- ✅ Validate file upload (type + size)

Chi tiết xem thêm trong `README.md`

---

## ❓ Troubleshooting

**Lỗi "Module not found"**:
```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

**Port 3000 đã bị chiếm**:
```bash
PORT=3001 pnpm dev
```

**TypeScript errors**:
```bash
pnpm build
# Xem errors cụ thể và fix
```

---

## 📞 Hỗ trợ

Xem chi tiết trong `README.md` hoặc liên hệ: support@phoneshop.vn

---

**Happy coding! 🎉**
