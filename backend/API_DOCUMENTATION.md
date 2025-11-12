# 📚 API Documentation - Phone Shop Backend

Tài liệu đầy đủ về tất cả các API endpoints.

## 🔐 Authentication

Hầu hết các API cần JWT token trong header:
```
Authorization: Bearer <token>
```

Token được lấy từ `/api/auth/login` hoặc `/api/auth/register`.

---

## 📋 Table of Contents

1. [Auth API](#auth-api)
2. [Products API](#products-api)
3. [Categories API](#categories-api)
4. [Cart API](#cart-api)
5. [Orders API](#orders-api)
6. [Reviews API](#reviews-api)
7. [Vouchers API](#vouchers-api)
8. [Admin API](#admin-api)

---

## 🔑 Auth API

### POST /api/auth/register
Đăng ký user mới.

**Request Body:**
```json
{
  "name": "Nguyễn Văn A",
  "email": "user@example.com",
  "password": "password123",
  "phone": "0123456789",
  "address": "123 Đường ABC"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Đăng ký thành công",
  "data": {
    "user": {
      "userId": 1,
      "name": "Nguyễn Văn A",
      "email": "user@example.com",
      "role": "customer"
    },
    "token": "jwt_token_here"
  }
}
```

### POST /api/auth/login
Đăng nhập.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:** Tương tự register

### GET /api/auth/me
Lấy thông tin user hiện tại (cần token).

**Headers:**
```
Authorization: Bearer <token>
```

---

## 📦 Products API

### GET /api/products
Lấy danh sách sản phẩm.

**Query Parameters:**
- `page` - Số trang (default: 1)
- `limit` - Số items mỗi trang (default: 10)
- `categoryId` - Filter theo category
- `brand` - Filter theo brand
- `minPrice` - Giá tối thiểu
- `maxPrice` - Giá tối đa
- `search` - Tìm kiếm theo tên

**Example:**
```
GET /api/products?page=1&limit=20&brand=Apple&minPrice=10000000
```

### GET /api/products/:id
Lấy chi tiết sản phẩm.

### POST /api/products
Tạo sản phẩm mới (cần admin).

**Request Body:**
```json
{
  "name": "iPhone 15 Pro",
  "description": "Điện thoại cao cấp",
  "price": 25000000,
  "stock": 10,
  "categoryId": 1,
  "brand": "Apple",
  "imageUrl": "https://example.com/image.jpg"
}
```

### PUT /api/products/:id
Cập nhật sản phẩm (cần admin).

### DELETE /api/products/:id
Xóa sản phẩm (soft delete, cần admin).

---

## 📁 Categories API

### GET /api/categories
Lấy danh sách danh mục.

### GET /api/categories/:id
Lấy chi tiết danh mục.

### POST /api/categories
Tạo danh mục mới.

**Request Body:**
```json
{
  "categoryName": "Điện thoại",
  "description": "Danh mục điện thoại"
}
```

---

## 🛒 Cart API

**Tất cả routes cần đăng nhập.**

### GET /api/cart
Lấy giỏ hàng của user.

### POST /api/cart/items
Thêm sản phẩm vào giỏ.

**Request Body:**
```json
{
  "productId": 1,
  "quantity": 2
}
```

### PUT /api/cart/items/:itemId
Cập nhật số lượng.

**Request Body:**
```json
{
  "quantity": 3
}
```

### DELETE /api/cart/items/:itemId
Xóa sản phẩm khỏi giỏ.

### DELETE /api/cart
Xóa toàn bộ giỏ hàng.

---

## 📝 Orders API

**Tất cả routes cần đăng nhập.**

### GET /api/orders
Lấy danh sách đơn hàng của user.

### GET /api/orders/:id
Lấy chi tiết đơn hàng.

### POST /api/orders
Tạo đơn hàng mới từ giỏ hàng.

**Request Body:**
```json
{
  "shippingAddress": "123 Đường ABC, Quận 1, TP.HCM",
  "paymentMethod": "cash",
  "voucherCode": "DISCOUNT10" // optional
}
```

**Response:** Tạo order, payment, và xóa cart.

### PUT /api/orders/:id/status
Cập nhật trạng thái đơn hàng.

**Request Body:**
```json
{
  "status": "processing" // pending, processing, shipped, delivered, cancelled
}
```

---

## ⭐ Reviews API

### GET /api/reviews/product/:productId
Lấy reviews của sản phẩm (public).

### POST /api/reviews
Tạo review mới (cần đăng nhập).

**Request Body:**
```json
{
  "productId": 1,
  "rating": 5,
  "comment": "Sản phẩm rất tốt!"
}
```

### PUT /api/reviews/:id
Cập nhật review (cần đăng nhập, chỉ review của mình).

### DELETE /api/reviews/:id
Xóa review (cần đăng nhập, chỉ review của mình).

---

## 🎫 Vouchers API

### GET /api/vouchers
Lấy danh sách vouchers active (public).

### GET /api/vouchers/validate/:code
Validate voucher code.

**Query Parameters:**
- `orderAmount` - Số tiền đơn hàng (để kiểm tra minOrderAmount)

**Example:**
```
GET /api/vouchers/validate/DISCOUNT10?orderAmount=1000000
```

### POST /api/vouchers
Tạo voucher mới (cần admin).

**Request Body:**
```json
{
  "code": "DISCOUNT10",
  "discountAmount": 100000,
  "discountPercent": 0,
  "expiryDate": "2025-12-31T23:59:59",
  "minOrderAmount": 500000,
  "usageLimit": 100
}
```

### PUT /api/vouchers/:id
Cập nhật voucher (cần admin).

### DELETE /api/vouchers/:id
Xóa voucher (cần admin).

---

## 👨‍💼 Admin API

**Tất cả routes cần admin role.**

### Users Management

- `GET /api/admin/users` - Lấy danh sách users
- `GET /api/admin/users/:id` - Lấy chi tiết user
- `PUT /api/admin/users/:id` - Cập nhật user

### Orders Management

- `GET /api/admin/orders` - Lấy tất cả orders
- `GET /api/admin/orders/:id` - Lấy chi tiết order
- `PUT /api/admin/orders/:id/status` - Cập nhật trạng thái order

### Products Management

- `GET /api/admin/products` - Lấy tất cả products (kể cả inactive)
- `POST /api/admin/products` - Tạo product
- `PUT /api/admin/products/:id` - Cập nhật product
- `DELETE /api/admin/products/:id` - Xóa product (hard delete)

### Statistics

- `GET /api/admin/stats` - Lấy thống kê tổng quan

**Response:**
```json
{
  "success": true,
  "data": {
    "totalUsers": 100,
    "totalProducts": 50,
    "totalOrders": 200,
    "totalRevenue": 5000000000
  }
}
```

---

## 📊 Response Format

Tất cả API trả về format chuẩn:

**Success:**
```json
{
  "success": true,
  "message": "Thông báo",
  "data": { ... }
}
```

**Error:**
```json
{
  "success": false,
  "message": "Thông báo lỗi",
  "error": "Chi tiết lỗi"
}
```

---

## 🔒 Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

---

## 🧪 Testing

Sử dụng Postman hoặc curl để test API:

```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'

# Get Products (với token)
curl -X GET http://localhost:5000/api/products \
  -H "Authorization: Bearer <token>"
```

---

Chúc bạn code vui vẻ! 🚀

