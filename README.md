# 📱 PhoneShop - E-Commerce Frontend

> Website bán điện thoại chuyên nghiệp với Next.js 14 + TypeScript + Tailwind CSS

[![Next.js](https://img.shields.io/badge/Next.js-14.2.33-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

## ✅ Tổng quan

**PhoneShop FE** là ---

## 🚀 Quick Start Guideo diện người dùng hiện đại cho website thương mại điện---

## 📖 Usage Guide bán điện thoại, được xây dựng với công nghệ tiên tiến và tối ưu

| Frontend Route | Spring Boot Endpoint | Method | Auth |
|----------------|---------------------|--------|------|
| `/api/products` | `/api/products` | GET | No |
| `/api/products/:slug` | `/api/products/:slug` | GET | No |
| `/api/products/:id/reviews` | `/api/products/:id/reviews` | GET/POST | POST: Yes |
| `/api/search` | `/api/search` | GET | No |
| `/api/auth/login` | `/api/auth/login` | POST | No |
| `/api/auth/register` | `/api/auth/register` | POST | No |
| `/api/auth/logout` | `/api/auth/logout` | POST | Yes |
| `/api/auth/me` | `/api/auth/me` | GET | Yes |
| `/api/cart` | `/api/cart` | GET/POST/PUT/DELETE | Yes |
| `/api/orders` | `/api/orders` | GET/POST | Yes |

---

## 🔒 Security Considerationsa trải nghiệm người dùng.

### 📊 Thông số dự án
- **Tổng số file**: 60+ files
- **Lines of Code**: ~3,500+ lines
- **Kích thước**: ~2.09 MB (đã push lên GitHub)
- **Components**: 20+ React components
- **API Endpoints**: 15+ mock endpoints
- **Pages**: 10+ pages
- **Sản phẩm**: 30 sản phẩm với chi tiết đầy đủ
- **TypeScript Coverage**: 100%
- **Responsive**: 100% mobile-friendly

### 🛠️ Tech Stack
- **Framework**: Next.js 14.2.33 (App Router)
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS 3.4
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **Form Handling**: React Hook Form + Zod
- **Icons**: Lucide React
- **Date Handling**: date-fns

---

## 📂 Cấu trúc thư mục chi tiết

### 🎯 Root Directory
```
FE/
├── 📁 app/                      # Next.js App Router
├── 📁 components/               # React components
├── 📁 lib/                      # Libraries & utilities
├── 📁 store/                    # Zustand state management
├── 📁 hooks/                    # Custom React hooks
├── 📁 styles/                   # Global styles
├── 📁 public/                   # Static assets
├── 📄 package.json              # Dependencies & scripts
├── 📄 tsconfig.json             # TypeScript configuration
├── 📄 tailwind.config.ts        # Tailwind CSS configuration
├── 📄 next.config.js            # Next.js configuration
├── 📄 .gitignore                # Git ignore rules
├── 📄 .env.example              # Environment variables template
└── 📄 README.md                 # Documentation (this file)
```

### 🔧 Configuration Files
```
📦 Root
├── 📄 package.json              # Project dependencies
│   ├── next: 14.2.33
│   ├── react: 18.x
│   ├── typescript: 5.x
│   ├── tailwindcss: 3.4.1
│   ├── zustand: 4.x
│   ├── @tanstack/react-query: 5.x
│   ├── react-hook-form: 7.x
│   ├── zod: 3.x
│   ├── lucide-react: latest
│   └── date-fns: latest
│
├── 📄 tsconfig.json             # TypeScript config
│   ├── strict: true
│   ├── moduleResolution: bundler
│   └── paths: @/* mapping
│
├── 📄 tailwind.config.ts        # Tailwind config
│   ├── Custom colors (danger, success, warning)
│   ├── Custom spacing
│   └── Custom breakpoints
│
├── 📄 next.config.js            # Next.js config
│   ├── Image domains
│   ├── React strict mode
│   └── Experimental features
│
├── 📄 .gitignore                # Git ignore
│   ├── node_modules/
│   ├── .next/
│   ├── .env*.local
│   └── dist/
│
└── 📄 .env.example              # Environment template
    └── NEXT_PUBLIC_API_BASE_URL
```

### 🎨 Styles Directory
```
📁 styles/
└── 📄 globals.css               # Global CSS
    ├── Tailwind directives (@tailwind base/components/utilities)
    ├── Custom CSS variables (:root)
    ├── Base styles (body, html)
    └── Custom utility classes
```

### 📚 Library Directory
```
📁 lib/
├── 📄 types.ts                  # TypeScript type definitions
│   ├── Product, ProductDetail, ProductVariant
│   ├── User, AuthResponse
│   ├── Cart, CartItem
│   ├── Order, OrderItem
│   ├── Review, ReviewStats
│   └── Filter, Sort, Pagination interfaces
│
├── 📄 schemas.ts                # Zod validation schemas
│   ├── loginSchema
│   ├── registerSchema
│   ├── reviewSchema
│   ├── checkoutSchema
│   └── contactSchema
│
├── 📄 utils.ts                  # Utility functions
│   ├── formatPrice(number) → "1.000.000₫"
│   ├── formatDate(date) → "05/10/2025"
│   ├── calculateDiscount(price, salePrice)
│   ├── cn(...classes) → merged classnames
│   └── debounce(fn, delay)
│
├── 📄 api.ts                    # API wrapper functions
│   ├── fetchWithAuth(url, options)
│   ├── getProducts(filters)
│   ├── getProductBySlug(slug)
│   ├── login(credentials)
│   ├── register(userData)
│   └── Error handling helpers
│
└── 📄 mockData.ts               # Mock data (30 products)
    ├── MOCK_PRODUCTS (30 items)
    ├── MOCK_PRODUCT_DETAILS (30 complete details)
    │   ├── iPhone (5): 15 Pro Max, 15 Pro, 15 Plus, 15, 14 Pro Max
    │   ├── Samsung (6): S24 Ultra, S24+, S24, Z Fold6, Z Flip6, A55
    │   ├── Xiaomi (7): 14 Ultra, 14, 13T Pro, Redmi Note 13 Pro+, POCO X6 Pro, 13T, Redmi Note 13
    │   ├── OPPO (3): Find N3 Flip, Reno11 F, A58
    │   ├── Vivo (4): V30e, Y36, Y02T, Y16
    │   ├── realme (2): C55, C53
    │   ├── Nokia (2): C32, C12 Pro
    │   └── Vsmart (1): Joy 4
    │
    └── MOCK_REVIEWS (sample reviews)

### 🗃️ Store Directory (Zustand)

    store/
    ├── cart.ts                      # Shopping cart state
    │   ├── State: items, totalItems, totalPrice
    │   ├── Actions: addItem, removeItem, updateQuantity, clearCart
    │   └── Persist: localStorage sync
    │
    └── ui.ts                        # UI state management
        ├── State: isMobileMenuOpen, toastMessage, isLoading
        ├── Actions: toggleMobileMenu, showToast, hideToast
        └── Toast types: success, error, warning, info


### 🪝 Hooks Directory

    hooks/
    ├── useAuth.ts                   # Authentication hook
    │   ├── useLogin() → mutation
    │   ├── useRegister() → mutation
    │   ├── useLogout() → mutation
    │   ├── useUser() → query current user
    │   └── Token refresh handling
    │
    ├── useFilters.ts                # Product filter hook
    │   ├── State: brand, priceRange, ram, rom
    │   ├── setFilter(key, value)
    │   ├── clearFilters()
    │   └── URL sync (useSearchParams)
    │
    └── useDebounce.ts               # Debounce hook
        ├── useDebounce(value, delay)
        └── Usage: Search input optimization

### 🧩 Components Directory

    components/
    ├── Header.tsx                   # Site header
    │   ├── Logo + Navigation links
    │   ├── SearchBox integration
    │   ├── Cart icon with badge
    │   ├── User menu (login/profile)
    │   └── Mobile hamburger menu
    │
    ├── Footer.tsx                   # Site footer
    │   ├── Company info
    │   ├── Quick links (policies, contact)
    │   ├── Social media links
    │   └── Copyright notice
    │
    ├── ProductCard.tsx              # Product card (Samsung S24+ style)
    │   ├── ✨ NEW DESIGN: Red border (border-2 border-danger)
    │   ├── Discount badge (top-left)
    │   ├── Installment badge (top-right)
    │   ├── Product image with hover effect
    │   ├── Product name + brand
    │   ├── Price in RED (text-danger text-lg font-bold)
    │   ├── Star rating (⭐ emoji + count)
    │   ├── Heart wishlist button (lucide-react)
    │   └── Client Component ("use client" directive)
    │
    ├── ProductFilters.tsx           # Filter sidebar
    │   ├── Brand filter (checkbox group)
    │   ├── Price range slider
    │   ├── RAM filter (4GB, 6GB, 8GB, 12GB+)
    │   ├── Storage filter (64GB, 128GB, 256GB, 512GB+)
    │   └── Clear all button
    │
    ├── ProductSort.tsx              # Sort dropdown
    │   ├── Newest
    │   ├── Most popular
    │   ├── Price: Low to High
    │   ├── Price: High to Low
    │   └── Best rating
    │
    ├── RatingStars.tsx              # Star rating display
    │   ├── Props: rating (0-5), size, showCount
    │   ├── Filled/half/empty stars
    │   └── Review count badge
    │
    ├── CartDrawer.tsx               # Mini cart drawer
    │   ├── Slide-in from right
    │   ├── Cart items list
    │   ├── Quantity controls (+/-)
    │   ├── Remove item button
    │   ├── Subtotal calculation
    │   └── Checkout button
    │
    ├── Toast.tsx                    # Toast notification
    │   ├── Auto-dismiss (3s)
    │   ├── Types: success, error, warning, info
    │   ├── Close button
    │   └── Slide-in animation
    │
    ├── SearchBox.tsx                # Search with autocomplete
    │   ├── Debounced input (300ms)
    │   ├── Live suggestions
    │   ├── Product thumbnails
    │   ├── Price display
    │   ├── Navigate to detail on click
    │   └── Clear button
    │
    ├── Breadcrumb.tsx               # Breadcrumb navigation
    │   ├── Home > Category > Product
    │   └── Schema.org markup
    │
    ├── Pagination.tsx               # Pagination controls
    │   ├── Previous/Next buttons
    │   ├── Page numbers (with ellipsis)
    │   ├── Jump to page
    │   └── Items per page selector
    │
    └── ui/                          # Shadcn UI components
        ├── button.tsx               # Button variants
        ├── input.tsx                # Input field
        ├── label.tsx                # Form label
        ├── dialog.tsx               # Modal dialog
        ├── dropdown-menu.tsx        # Dropdown menu
        ├── skeleton.tsx             # Loading skeleton
        ├── badge.tsx                # Badge component
        └── card.tsx                 # Card wrapper

### 🌐 API Routes (Mock Backend)

    app/api/
    ├── products/
    │   ├── route.ts                 # GET /api/products
    │   │   ├── Query params: brand, minPrice, maxPrice, ram, rom
    │   │   ├── Sorting: newest, popular, price-asc, price-desc
    │   │   ├── Pagination: page, limit (default 12)
    │   │   ├── Returns: { products, total, page, totalPages }
    │   │   └── Mock delay: 500ms
    │   │
    │   ├── [slug]/route.ts          # GET /api/products/:slug
    │   │   ├── Returns: ProductDetail with full specs
    │   │   ├── Includes: gallery, variants, description
    │   │   ├── 404 if not found
    │   │   └── Mock delay: 300ms
    │   │
    │   └── [slug]/reviews/route.ts  # GET/POST /api/products/:slug/reviews
    │       ├── GET: List reviews with pagination
    │       ├── POST: Add new review (rating, comment, images)
    │       ├── Auth required for POST
    │       └── Mock delay: 400ms
    │
    ├── search/
    │   └── route.ts                 # GET /api/search?q=keyword
    │       ├── Search in: name, brand, description
    │       ├── Fuzzy matching
    │       ├── Limit: 10 results
    │       └── Mock delay: 200ms
    │
    ├── auth/
    │   ├── login/route.ts           # POST /api/auth/login
    │   │   ├── Body: { email, password }
    │   │   ├── Returns: { user, token }
    │   │   ├── Sets HttpOnly cookie (mock)
    │   │   └── Mock users: admin@test.com / 123456
    │   │
    │   ├── register/route.ts        # POST /api/auth/register
    │   │   ├── Body: { name, email, password, phone }
    │   │   ├── Validation: Zod schema
    │   │   ├── Returns: { user, token }
    │   │   └── Auto-login after register
    │   │
    │   ├── logout/route.ts          # POST /api/auth/logout
    │   │   ├── Clears auth cookie
    │   │   └── Returns: { success: true }
    │   │
    │   ├── forgot/route.ts          # POST /api/auth/forgot-password
    │   │   ├── Body: { email }
    │   │   ├── Sends reset email (mock)
    │   │   └── Returns: { message }
    │   │
    │   └── me/route.ts              # GET /api/auth/me
    │       ├── Requires: Auth cookie
    │       ├── Returns: Current user data
    │       └── 401 if not authenticated
    │
    ├── cart/
    │   └── route.ts                 # GET/POST/PUT/DELETE /api/cart
    │       ├── GET: Get user's cart
    │       ├── POST: Add item to cart
    │       ├── PUT: Update item quantity
    │       ├── DELETE: Remove item
    │       └── Syncs with Zustand store
    │
    ├── orders/
    │   └── route.ts                 # GET/POST /api/orders
    │       ├── GET: List user orders (with pagination)
    │       ├── POST: Create new order
    │       ├── Body: { items, shippingAddress, paymentMethod }
    │       └── Returns: { order, orderId }
    │
    └── uploads/
        └── sign/route.ts            # POST /api/uploads/sign
            ├── Generate pre-signed URL for S3 (mock)
            ├── Validate: File type, size (max 5MB)
            ├── Allowed: image/jpeg, image/png, image/webp
            └── Returns: { url, uploadUrl }

### 📄 Pages (App Router)

    app/
    ├── layout.tsx                   # Root layout
    │   ├── HTML structure
    │   ├── Metadata (title, description, OG tags)
    │   ├── Header + Footer wrapper
    │   ├── Providers (React Query, Zustand)
    │   └── Global styles import
    │
    ├── page.tsx                     # Homepage (/)
    │   ├── Hero banner with CTA
    │   ├── Featured products carousel
    │   ├── Product categories grid
    │   ├── Top deals section
    │   ├── Brand showcase
    │   └── SEO optimized
    │
    ├── dien-thoai/
    │   ├── page.tsx                 # Product listing (/dien-thoai)
    │   │   ├── ProductFilters sidebar
    │   │   ├── ProductSort dropdown
    │   │   ├── Product grid (responsive)
    │   │   ├── Pagination
    │   │   ├── Empty state
    │   │   ├── Loading skeleton
    │   │   └── URL state sync
    │   │
    │   └── [slug]/page.tsx          # Product detail (/dien-thoai/:slug)
    │       ├── Image gallery (main + thumbnails)
    │       ├── Product info (name, brand, price)
    │       ├── Discount badge
    │       ├── Stock status indicator
    │       ├── Add to cart button
    │       ├── Quantity selector
    │       ├── Technical specs table
    │       ├── HTML description (safe)
    │       ├── Reviews section
    │       ├── Write review form
    │       ├── Related products
    │       └── generateMetadata() for SEO
    │
    ├── search/
    │   └── page.tsx                 # Search results (/search?q=keyword)
    │       ├── Search query display
    │       ├── Results count
    │       ├── Product grid
    │       ├── No results message
    │       └── Search suggestions
    │
    ├── cart/
    │   └── page.tsx                 # Shopping cart (/cart)
    │       ├── Cart items list
    │       ├── Product thumbnail + info
    │       ├── Quantity controls
    │       ├── Remove item button
    │       ├── Subtotal calculation
    │       ├── Shipping estimate
    │       ├── Tax calculation
    │       ├── Total amount
    │       ├── Promo code input
    │       ├── Continue shopping button
    │       ├── Proceed to checkout button
    │       └── Empty cart state
    │
    ├── auth/
    │   └── login/page.tsx           # Login page (/auth/login)
    │       ├── Email + Password form
    │       ├── Remember me checkbox
    │       ├── Forgot password link
    │       ├── Social login buttons (mock)
    │       ├── Register link
    │       ├── Form validation (Zod)
    │       └── Redirect after login
    │
    ├── chinh-sach-bao-hanh/page.tsx # Warranty policy
    │   ├── Policy content
    │   ├── Terms & conditions
    │   └── Contact info
    │
    ├── chinh-sach-doi-tra/page.tsx  # Return policy
    │   ├── Return process
    │   ├── Timeframe
    │   └── Requirements
    │
    └── lien-he/page.tsx             # Contact page
        ├── Contact form
        ├── Store addresses
        ├── Phone numbers
        ├── Email addresses
        └── Google Maps embed (optional)

### 🖼️ Public Assets

    public/
    ├── placeholder-phone.jpg        # Default product image
    ├── images/                      # Product images (to be added)
    │   ├── iphone-15-pro-max.jpg
    │   ├── samsung-s24-ultra.jpg
    │   └── ... (30 products)
    ├── icons/
    │   ├── favicon.ico
    │   ├── apple-icon.png
    │   └── android-icon.png
    └── robots.txt                   # SEO robots file

---

## 🎯 Tính năng đã hoàn thành

### ✅ Core Features (100%)
- ✅ **Homepage**: Hero banner, featured products, categories, top deals
- ✅ **Product Listing**: Grid layout, responsive design
- ✅ **Filters**: Brand, price range, RAM, storage
- ✅ **Sorting**: Newest, popular, price (asc/desc), rating
- ✅ **Pagination**: Page navigation, items per page
- ✅ **Product Detail**: Gallery, specs, variants, reviews
- ✅ **Search**: Autocomplete, live suggestions, debounced input
- ✅ **Shopping Cart**: Add/remove/update, mini drawer, full page
- ✅ **Authentication**: Login, register, logout (mock)
- ✅ **Responsive Design**: Mobile-first, tablet, desktop
- ✅ **Loading States**: Skeleton loaders, spinners
- ✅ **Error Handling**: Toast notifications, error boundaries

### ✅ Data Features (100%)

- ✅ **Product Variants**: Colors, storage options, SKU, stock status
- ✅ **Product Gallery**: 5 images per product
- ✅ **HTML Descriptions**: Formatted with bullet points
- ✅ **Real Specifications**: Sourced from manufacturer websites
- ✅ **Pricing**: Original price, sale price, discount percentage

### ✅ UI/UX Features (100%)
- ✅ **ProductCard Redesign**: Samsung S24+ style
  - Red border (border-2 border-danger)
  - Discount badge (top-left corner)
  - Installment badge (top-right corner)
  - Price in RED (text-danger text-lg font-bold)
  - Star rating with emoji (⭐ + count)
  - Heart wishlist button (lucide-react Heart icon)
  - Client Component with "use client" directive
- ✅ **Toast Notifications**: Success, error, warning, info
- ✅ **Loading Skeletons**: Content placeholders
- ✅ **Responsive Navigation**: Mobile hamburger menu
- ✅ **Breadcrumbs**: Navigation trail
- ✅ **Empty States**: No products, no cart items

### ✅ Developer Experience (100%)
- ✅ **TypeScript**: 100% type coverage
- ✅ **ESLint**: Code quality checks
- ✅ **Prettier**: Code formatting
- ✅ **Git**: Version control with .gitignore
- ✅ **Documentation**: Comprehensive README
- ✅ **Mock API**: Ready for backend integration
- ✅ **Environment Variables**: .env.example template

---

## � Quick Start Guide

### 📋 Prerequisites
- **Node.js**: 18.x or higher
- **pnpm**: 8.x or higher (recommended) or npm/yarn
- **Git**: For version control

### 🔧 Installation

```bash
# Clone repository
git clone https://github.com/zh13u/AT_Web_CSDL.git
cd AT_Web_CSDL
```

### ⚙️ Environment Setup

```bash
# Copy environment template
cp .env.example .env.local

# Edit .env.local (optional for mock API)
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
```

### 🏃 Run Development Server

```bash
# Start development server
pnpm dev
# or
npm run dev

# Open browser
# http://localhost:3000
```

### 📦 Build for Production

```bash
# Build production bundle
pnpm build

# Start production server
pnpm start

# Or export static site
pnpm build && pnpm export
```

### 🧪 Available Scripts

```bash
# Development
pnpm dev              # Start dev server (http://localhost:3000)

# Build
pnpm build            # Build for production
pnpm start            # Start production server

# Code Quality
pnpm lint             # Run ESLint
pnpm format           # Format code with Prettier
pnpm type-check       # TypeScript type checking

# Clean
pnpm clean            # Remove .next, node_modules, dist
```

---

## � Usage Guide

### 🏠 Homepage
```
URL: http://localhost:3000/
Features:
- Hero banner with CTA
- Featured products carousel
- Category grid
- Top deals section
```

### 📱 Product Listing
```
URL: http://localhost:3000/dien-thoai
Features:
- Filter by brand, price, RAM, storage
- Sort by newest, popular, price, rating
- Pagination (12 items per page)
- Responsive grid layout
```




## 🎓 Learning Resources & Best Practices

### 📚 Documentation Links
- [Next.js App Router](https://nextjs.org/docs/app)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Zustand Guide](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [React Query](https://tanstack.com/query/latest/docs/react/overview)
- [Zod Validation](https://zod.dev/)

### 🏗️ Architecture Patterns
```
📦 Feature-based Structure
├── /app/[feature]/          # Feature pages
├── /components/[feature]/   # Feature components
├── /hooks/use[Feature].ts   # Feature hooks
└── /store/[feature].ts      # Feature state

📦 Separation of Concerns
├── /lib/types.ts            # Type definitions
├── /lib/schemas.ts          # Validation schemas
├── /lib/utils.ts            # Pure utility functions
└── /lib/api.ts              # API layer

📦 Component Composition
├── /components/ui/          # Reusable primitives
└── /components/[domain]/    # Domain components
```


---

### 🆘 Getting Help
- **GitHub Issues**: [Create an issue](https://github.com/zh13u/AT_Web_CSDL/issues)
- **Pull Requests**: [Submit a PR](https://github.com/zh13u/AT_Web_CSDL/pulls)
- **Documentation**: This README + code comments

### 👥 Team
- **Repository**: [zh13u/AT_Web_CSDL](https://github.com/zh13u/AT_Web_CSDL)
- **Branch**: FE
- **License**: MIT (if applicable)

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🙏 Acknowledgments

- **Next.js Team**: For the amazing framework
- **Vercel**: For excellent deployment platform
- **Tailwind CSS**: For utility-first CSS framework
- **React Team**: For the React library
- **Open Source Community**: For all the wonderful packages

---

## 📅 Changelog

### Version 1.0.0 (2025-10-05)
- ✅ Initial release with 30 complete products
- ✅ ProductCard redesign (Samsung S24+ style)
- ✅ Full e-commerce features (cart, search, filters)
- ✅ Mock API with realistic data
- ✅ TypeScript + Tailwind + Zustand integration
- ✅ Responsive design for all devices
- ✅ Comprehensive documentation

---



