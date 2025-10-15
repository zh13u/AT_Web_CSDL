# 🛠️ ADMIN PANEL - HƯỚNG DẪN SỬ DỤNG

## 📋 TỔNG QUAN

Admin Panel là hệ thống quản lý backend cho website bán điện thoại, cho phép quản trị viên quản lý sản phẩm, đơn hàng, người dùng và đánh giá.

## 🚀 TRUY CẬP

**URL:** `http://localhost:3000/admin`

**Credentials:**
- **Email:** `admin@test.com`
- **Password:** `123456`

**Yêu cầu:** 
- ✅ Phải đăng nhập với tài khoản admin
- ✅ Chỉ user có email `admin@test.com` mới được phép truy cập
- ❌ Các user khác sẽ bị chuyển về trang chủ

## 📱 CHỨC NĂNG

### 1️⃣ **Dashboard** (`/admin`)
Trang tổng quan hiển thị:
- 📊 **Statistics Cards:**
  - 📱 Tổng số sản phẩm
  - 📦 Tổng số đơn hàng
  - 👥 Tổng số người dùng
  - 💰 Tổng doanh thu

- 📋 **Đơn hàng mới:**
  - Danh sách 5 đơn hàng gần nhất
  - Trạng thái đơn hàng (Pending, Processing, Completed)
  - Thông tin khách hàng và tổng tiền

- ⚠️ **Sản phẩm sắp hết hàng:**
  - Cảnh báo sản phẩm có tồn kho thấp
  - Số lượng còn lại

---

### 2️⃣ **Quản lý Sản phẩm** (`/admin/products`)

**Chức năng:**
- ✅ Xem danh sách tất cả sản phẩm
- 🔍 Tìm kiếm theo tên hoặc thương hiệu
- ➕ Thêm sản phẩm mới (UI đã có, logic đang phát triển)
- ✏️ Sửa thông tin sản phẩm
- 🗑️ Xóa sản phẩm

**Thông tin hiển thị:**
- Ảnh thumbnail
- Tên sản phẩm & ID
- Thương hiệu
- Giá (có giá sale nếu có)
- Đánh giá (rating + số lượng)
- Trạng thái (Hot 🔥, New ✨)

**API:**
```
GET    /api/admin/products       - Lấy danh sách
POST   /api/admin/products       - Thêm mới
PUT    /api/admin/products/:id   - Cập nhật
DELETE /api/admin/products/:id   - Xóa
```

---

### 3️⃣ **Quản lý Đơn hàng** (`/admin/orders`)

**Chức năng:**
- ✅ Xem danh sách đơn hàng
- 🔍 Lọc theo trạng thái:
  - ⏳ Chờ xử lý (Pending)
  - 🔄 Đang xử lý (Processing)
  - 🚚 Đang giao (Shipping)
  - ✅ Hoàn thành (Completed)
  - ❌ Đã hủy (Cancelled)
- 👁️ Xem chi tiết đơn hàng (modal popup)
- 🔄 Cập nhật trạng thái đơn hàng

**Chi tiết đơn hàng:**
- Mã đơn hàng
- Thông tin khách hàng (tên, SĐT, địa chỉ)
- Danh sách sản phẩm
- Tổng tiền
- Phương thức thanh toán

**API:**
```
GET /api/admin/orders       - Lấy danh sách
PUT /api/admin/orders/:id   - Cập nhật trạng thái
```

---

### 4️⃣ **Quản lý Người dùng** (`/admin/users`)

**Chức năng:**
- ✅ Xem danh sách người dùng
- 🔍 Tìm kiếm theo tên, email, SĐT
- 🚫 Khóa/Mở khóa tài khoản

**Thông tin hiển thị:**
- Avatar (first letter)
- Tên & email
- Số điện thoại
- Số đơn hàng đã đặt
- Tổng chi tiêu
- Ngày tham gia
- Trạng thái (Đã khóa/Hoạt động)

**API:**
```
GET /api/admin/users       - Lấy danh sách
PUT /api/admin/users/:id   - Khóa/mở khóa
```

---

### 5️⃣ **Quản lý Đánh giá** (`/admin/reviews`)

**Chức năng:**
- ✅ Xem tất cả đánh giá
- ✅ Duyệt đánh giá (Approve)
- ❌ Từ chối đánh giá (Reject)
- 🗑️ Xóa đánh giá spam

**Thông tin hiển thị:**
- Avatar & tên người dùng
- Tên sản phẩm
- Số sao (1-5 ⭐)
- Nội dung đánh giá
- Thời gian đánh giá
- Trạng thái:
  - ⏳ Chờ duyệt (Pending)
  - ✅ Đã duyệt (Approved)
  - ❌ Từ chối (Rejected)

**API:**
```
GET    /api/admin/reviews       - Lấy danh sách
PUT    /api/admin/reviews/:id   - Duyệt/từ chối
DELETE /api/admin/reviews/:id   - Xóa
```

---

## 🎨 GIAO DIỆN

### **Layout:**
- **Header:** Logo Admin Panel + nút về trang chủ + avatar admin
- **Sidebar:** Menu điều hướng với icons
- **Main Content:** Nội dung động theo từng trang

### **Design System:**
- ✅ Consistent với design trang chủ
- ✅ Dark mode support (theo theme hiện tại)
- ✅ Responsive (mobile-friendly)
- ✅ Icons emoji (dễ nhìn, không cần icon library)

### **Colors:**
```
Blue    (📱 Products)   - #3B82F6
Green   (📦 Orders)     - #10B981
Purple  (👥 Users)      - #8B5CF6
Orange  (💰 Revenue)    - #F97316
Yellow  (⏳ Pending)    - #F59E0B
Red     (❌ Error)      - #EF4444
```

---

## 🔐 BẢO MẬT

### **Hiện tại:**
- ✅ Kiểm tra đăng nhập (redirect nếu chưa login)
- ✅ Kiểm tra admin email (`admin@test.com`)
- ✅ Access denied page cho non-admin users
- ✅ Auto redirect về trang chủ nếu không phải admin

### **Cách hoạt động:**
```typescript
// In AdminLayout.tsx
useEffect(() => {
    if (!user) {
        router.push("/auth/login?redirect=/admin");
        return;
    }
    
    // Check if user is admin (admin@test.com)
    if (user.email !== "admin@test.com") {
        router.push("/");
    }
}, [user, router]);
```

### **Access Denied Screen:**
- Hiển thị khi user không phải admin
- Icon 🚫 + thông báo rõ ràng
- Nút "Về trang chủ" để quay lại

### **Cần thêm (Production):**
```typescript
// Khi có backend hỗ trợ admin role
if (user && !user.isAdmin) {
    router.push("/");
}
```

### **API Routes Protection:**
Tất cả API routes trong `/api/admin/**` cần thêm:
```typescript
// Check authentication
const session = request.cookies.get("session");
if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

// Check admin role (khi có backend)
// const user = await getUserFromSession(session);
// if (!user.isAdmin) {
//     return NextResponse.json({ error: "Forbidden" }, { status: 403 });
// }
```

---

## 📂 CẤU TRÚC FILE

```
app/
├── admin/
│   ├── page.tsx              # Dashboard
│   ├── products/
│   │   └── page.tsx         # Products management
│   ├── orders/
│   │   └── page.tsx         # Orders management
│   ├── users/
│   │   └── page.tsx         # Users management
│   └── reviews/
│       └── page.tsx         # Reviews management
│
├── api/
│   └── admin/
│       ├── stats/route.ts           # Dashboard stats
│       ├── products/
│       │   ├── route.ts            # GET/POST products
│       │   └── [id]/route.ts       # PUT/DELETE product
│       ├── orders/
│       │   ├── route.ts            # GET orders
│       │   └── [id]/route.ts       # PUT order status
│       ├── users/
│       │   ├── route.ts            # GET users
│       │   └── [id]/route.ts       # PUT user (block/unblock)
│       └── reviews/
│           ├── route.ts            # GET reviews
│           └── [id]/route.ts       # PUT/DELETE review
│
components/
└── AdminLayout.tsx           # Shared layout for all admin pages
```

---

## 🚧 ĐANG PHÁT TRIỂN

### **TODO List:**

#### **High Priority:**
- [ ] Add admin role check (backend support needed)
- [ ] Implement product add/edit form
- [ ] Add pagination for all lists
- [ ] Add sorting & advanced filters
- [ ] Upload product images

#### **Medium Priority:**
- [ ] Export data to Excel/CSV
- [ ] Real-time notifications for new orders
- [ ] Bulk actions (delete multiple items)
- [ ] Order invoice printing
- [ ] Analytics charts (sales by month, top products...)

#### **Low Priority:**
- [ ] Activity logs (audit trail)
- [ ] Email notifications for admins
- [ ] Advanced search with multiple criteria
- [ ] Dark/Light mode toggle

---

## 📊 DỮ LIỆU MOCK

Hiện tại hệ thống sử dụng **MOCK data** trong memory:
- `MOCK_PRODUCTS` từ `lib/mockData.ts`
- `MOCK_STATS` trong `/api/admin/stats/route.ts`
- `MOCK_ORDERS` trong `/api/admin/orders/route.ts`
- `MOCK_USERS` trong `/api/admin/users/route.ts`
- `MOCK_REVIEWS` trong `/api/admin/reviews/route.ts`

**Khi migrate sang database:**
1. Thay thế MOCK data bằng database queries
2. Thêm validation với Zod schemas
3. Implement transaction handling
4. Add error logging

---

## 🎯 WORKFLOW ĐIỂN HÌNH

### **Quản lý đơn hàng:**
1. Admin vào `/admin/orders`
2. Thấy đơn hàng mới (status: Pending)
3. Click "Xem" để xem chi tiết
4. Kiểm tra thông tin → Chuyển status sang "Processing"
5. Khi chuẩn bị xong → "Shipping"
6. Giao hàng thành công → "Completed"

### **Duyệt đánh giá:**
1. Admin vào `/admin/reviews`
2. Thấy đánh giá mới (status: Pending)
3. Đọc nội dung
4. Nếu hợp lệ → Click "✅ Duyệt"
5. Nếu spam/không phù hợp → Click "❌ Từ chối" hoặc "🗑️ Xóa"

### **Quản lý sản phẩm:**
1. Admin vào `/admin/products`
2. Tìm kiếm sản phẩm cần sửa
3. Click "✏️ Sửa" (coming soon)
4. Cập nhật thông tin → Save
5. Hoặc xóa sản phẩm hết hàng

---

## 💡 TIPS

1. **Loading States:** Mọi action đều có loading indicator
2. **Confirmation Dialogs:** Xóa/Khóa sẽ hỏi xác nhận
3. **Auto Refresh:** Sau mỗi action, data tự động reload (`refetch()`)
4. **Responsive:** Sidebar collapse trên mobile (coming soon)
5. **Keyboard Shortcuts:** (coming soon)

---

## 🐛 KNOWN ISSUES

1. ✅ ~~Admin role đã được kiểm tra~~ (chỉ `admin@test.com` vào được)
2. ⚠️ Pagination chưa có (hiển thị hết data)
3. ⚠️ Add/Edit product form chưa hoàn thiện
4. ⚠️ Image upload chưa implement
5. ⚠️ Real-time updates chưa có (cần refresh manual)

---

## 📝 HƯỚNG DẪN ĐĂNG NHẬP ADMIN

### **Bước 1: Truy cập trang login**
```
http://localhost:3000/auth/login
```

### **Bước 2: Nhập thông tin admin**
```
Email: admin@test.com
Password: 123456
```

### **Bước 3: Đăng nhập thành công**
- Tự động redirect về trang chủ
- Click vào avatar/menu → Chọn "Admin Panel"
- Hoặc truy cập trực tiếp: `http://localhost:3000/admin`

### **Lưu ý:**
- ❌ Nếu đăng nhập bằng email khác → Không vào được admin
- ✅ Chỉ `admin@test.com` mới có quyền truy cập
- 🔒 Các user khác sẽ thấy màn hình "Truy cập bị từ chối"

---

## 📞 HỖ TRỢ

Nếu gặp vấn đề:
1. Check console log (F12)
2. Check Network tab để xem API calls
3. Đảm bảo đã đăng nhập
4. Clear cache nếu gặp lỗi lạ

---

**Version:** 1.0.0  
**Last Updated:** October 15, 2025  
**Status:** ✅ Beta - Core features working
