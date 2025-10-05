# PhoneShop - Frontend Next.js

Website bán điện thoại được xây dựng bằng **Next.js 14** (App Router) + **TypeScript** + **Tailwind CSS**.

## 🚀 Cài đặt và Chạy

```bash
# Cài đặt dependencies
pnpm install
# hoặc npm install
# hoặc yarn install

# Chạy development server
pnpm dev

# Build cho production
pnpm build

# Chạy production build
pnpm start
```

Mở trình duyệt và truy cập: **http://localhost:3000**

## 📁 Cấu trúc dự án

```
app/
  api/                    # Mock API endpoints (Next.js Route Handlers)
    products/route.ts     # GET danh sách sản phẩm (filter/sort/paginate)
    products/[slug]/      # GET chi tiết sản phẩm
    search/route.ts       # GET tìm kiếm
    auth/                 # Login/Register/Logout (mock)
    cart/route.ts         # GET/POST giỏ hàng
    orders/route.ts       # POST đặt hàng
  dien-thoai/
    page.tsx              # Danh sách điện thoại + filter/sort/pagination
    [slug]/page.tsx       # Chi tiết sản phẩm
  auth/
    login/page.tsx        # Đăng nhập
    register/page.tsx     # Đăng ký
  cart/page.tsx           # Giỏ hàng
  checkout/page.tsx       # Thanh toán
  layout.tsx              # Root layout
  page.tsx                # Trang chủ

components/
  Header.tsx              # Header + navigation
  Footer.tsx              # Footer
  ProductCard.tsx         # Card hiển thị sản phẩm
  CartDrawer.tsx          # Mini cart drawer
  Toast.tsx               # Toast notifications
  ui/                     # Shadcn/ui components
    button.tsx
    input.tsx
    label.tsx
    dialog.tsx
    skeleton.tsx

lib/
  api.ts                  # Wrapper fetch API (credentials, CSRF)
  types.ts                # TypeScript types
  schemas.ts              # Zod validation schemas
  utils.ts                # Utility functions
  mockData.ts             # Mock data cho API

store/
  cart.ts                 # Zustand store cho giỏ hàng
  ui.ts                   # Zustand store cho UI state

hooks/
  useAuth.ts              # Hook quản lý auth
  useFilters.ts           # Hook quản lý bộ lọc
  useDebounce.ts          # Debounce hook

styles/
  globals.css             # Global CSS với Tailwind + custom classes
```

## 🎨 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + tailwindcss-animate
- **UI Components**: Shadcn/ui (vendored)
- **Icons**: Lucide React
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **Form**: React Hook Form + Zod
- **HTTP**: Fetch API với credentials include

## 🔒 Bảo mật

### Mock API (Hiện tại)

API mock hiện đang chạy local trong `app/api/*` với các đặc điểm:

- Cookie `session` **KHÔNG** HttpOnly (để demo dễ dàng)
- **KHÔNG** có CSRF protection thật
- Dữ liệu lưu trong memory (mất khi restart server)

### Khi tích hợp Spring Boot Backend

#### 1. Cấu hình Backend (Spring Security)

```java
// Spring Security Config
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf
                .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
                .csrfTokenRequestHandler(new SpaCsrfTokenRequestHandler())
            )
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
            );
        
        return http.build();
    }
    
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of("http://localhost:3000")); // FE URL
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true); // QUAN TRỌNG
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}

// Cookie config
@Bean
public SecurityContextRepository securityContextRepository() {
    return new HttpSessionSecurityContextRepository();
}

// Set cookie attributes
response.addCookie(createCookie("JSESSIONID", sessionId, 
    true,  // httpOnly
    true,  // secure (HTTPS only)
    "Lax" // sameSite
));
```

#### 2. Cấu hình Frontend

**File `lib/api.ts`** đã được chuẩn bị sẵn:

```typescript
// Tự động gửi credentials (cookies)
credentials: 'include'

// Tự động đọc XSRF-TOKEN từ cookie và gửi header
headers: {
  'X-XSRF-TOKEN': csrfToken
}
```

**Chỉ cần thay đổi**:

```typescript
// .env.local
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
```

#### 3. Content Security Policy (CSP)

Backend nên set header CSP:

```
Content-Security-Policy: 
  default-src 'self';
  script-src 'self' 'nonce-{random}';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: blob: https:;
  media-src 'self' blob:;
  font-src 'self';
  connect-src 'self' http://localhost:8080;
  object-src 'none';
  base-uri 'self';
  frame-ancestors 'none';
  form-action 'self';
```

#### 4. Checklist Bảo mật

- ✅ **Cookies**: HttpOnly + Secure + SameSite=Lax
- ✅ **CSRF**: Token trong cookie `XSRF-TOKEN`, FE gửi qua header `X-XSRF-TOKEN`
- ✅ **CORS**: Chỉ allow origin cụ thể (http://localhost:3000)
- ✅ **XSS**: KHÔNG dùng `dangerouslySetInnerHTML` trừ khi dữ liệu đã sanitize ở BE
- ✅ **Session**: Lưu trong cookie HttpOnly, KHÔNG lưu trong localStorage
- ✅ **Upload**: Validate MIME type + size ở cả FE và BE
- ✅ **CSP**: Set ở BE để giảm thiểu XSS

## 🧪 Testing

```bash
# Run tests
pnpm test

# Run tests with coverage
pnpm test:coverage
```

## 📦 Build & Deploy

```bash
# Build cho production
pnpm build

# Test production build locally
pnpm start
```

## 🌐 Environment Variables

Tạo file `.env.local`:

```env
# API Base URL (để trống nếu dùng mock API local)
NEXT_PUBLIC_API_BASE_URL=

# Khi tích hợp Spring Boot:
# NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
```

## 📝 Tính năng

### Đã implement

- ✅ Trang chủ với sản phẩm hot/mới
- ✅ Danh sách sản phẩm với bộ lọc (brand, price)
- ✅ Sắp xếp (mới nhất, giá, bán chạy)
- ✅ Phân trang
- ✅ Chi tiết sản phẩm với gallery
- ✅ Chọn biến thể (màu, dung lượng)
- ✅ Tìm kiếm với autocomplete
- ✅ Giỏ hàng (Zustand + drawer)
- ✅ Đăng nhập / Đăng ký (mock)
- ✅ Toast notifications
- ✅ Responsive design
- ✅ Loading states (skeleton)

### Cần hoàn thiện (khi có thời gian)

- ⏳ Trang thanh toán (checkout)
- ⏳ Trang tài khoản (orders, profile)
- ⏳ Đánh giá sản phẩm + upload media
- ⏳ Trang chính sách (bảo hành, đổi trả)
- ⏳ SEO metadata động
- ⏳ JSON-LD structured data
- ⏳ Unit tests

## 🎯 Performance

- **Lighthouse Score Target**: ≥ 90 cho tất cả metrics
- **Image Optimization**: Next/Image với blur placeholder
- **Code Splitting**: Dynamic imports cho components nặng
- **Caching**: TanStack Query với staleTime hợp lý
- **Prefetch**: Prefetch links khi hover

## 📞 Liên hệ

- **Author**: PhoneShop Team
- **Email**: support@phoneshop.vn
- **Website**: https://phoneshop.vn

---

**Lưu ý**: Đây là demo FE với mock API. Khi tích hợp backend thật, vui lòng tuân thủ checklist bảo mật ở trên.
