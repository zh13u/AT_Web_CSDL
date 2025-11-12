import "reflect-metadata"; // BẮT BUỘC: Phải import đầu tiên để TypeORM decorators hoạt động
import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { AppDataSource } from "./data-source";
import productsRoutes from "./routes/products.routes";
import categoriesRoutes from "./routes/categories.routes";
import authRoutes from "./routes/auth.routes";
import cartRoutes from "./routes/cart.routes";
import ordersRoutes from "./routes/orders.routes";
import reviewsRoutes from "./routes/reviews.routes";
import vouchersRoutes from "./routes/vouchers.routes";
import adminRoutes from "./routes/admin.routes";

// ============================================
// INDEX.TS - Entry Point của Backend
// ============================================
// File này khởi động Express server và kết nối database

// Load biến môi trường từ file .env
dotenv.config();

// Tạo Express app
const app = express();
const PORT = process.env.PORT || 5000;

// ==================== MIDDLEWARES ====================
// Middleware: Code chạy trước khi request đến route handler

// CORS: Cho phép frontend (localhost:3000) gọi API
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true, // Cho phép gửi cookies
  })
);

// Body Parser: Parse JSON và URL-encoded data từ request body
app.use(express.json()); // Parse JSON: { "name": "John" }
app.use(express.urlencoded({ extended: true })); // Parse form data

// ==================== ROUTES ====================
// Định nghĩa các API endpoints

// Health check endpoint - Kiểm tra server có chạy không
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Phone Shop API is running",
    timestamp: new Date().toISOString(),
  });
});

// Root endpoint - Trang chủ API
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Phone Shop API",
    version: "1.0.0",
      endpoints: {
        health: "/health",
        products: "/api/products",
        categories: "/api/categories",
        auth: "/api/auth",
        cart: "/api/cart",
        orders: "/api/orders",
        reviews: "/api/reviews",
        vouchers: "/api/vouchers",
        admin: "/api/admin",
      },
  });
});

// ==================== API ROUTES ====================
// Sử dụng các routes

app.use("/api/products", productsRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/reviews", reviewsRoutes);
app.use("/api/vouchers", vouchersRoutes);
app.use("/api/admin", adminRoutes);

// ==================== DATABASE CONNECTION ====================

// Khởi tạo kết nối database
AppDataSource.initialize()
  .then(() => {
    // Kết nối thành công
    console.log("✅ Database connected successfully");
    console.log(`📊 Database: ${process.env.DB_DATABASE || "phone_shop_db"}`);
    console.log(`🏠 Host: ${process.env.DB_HOST || "localhost"}:${process.env.DB_PORT || "3306"}`);

    // Khởi động server sau khi database đã kết nối
    app.listen(PORT, () => {
      console.log("\n🚀 Server is running!");
      console.log(`📍 URL: http://localhost:${PORT}`);
      console.log(`📊 Environment: ${process.env.NODE_ENV || "development"}`);
      console.log(`\n✨ Try: http://localhost:${PORT}/health\n`);
    });
  })
  .catch((error) => {
    // Kết nối thất bại
    console.error("❌ Error during database initialization:", error);
    console.error("\n💡 Tips:");
    console.error("   1. Make sure Docker containers are running: docker-compose ps");
    console.error("   2. Wait 10-15 seconds after starting containers");
    console.error("   3. Check .env file has correct database credentials");
    console.error("   4. Try: docker-compose restart mysql\n");
    process.exit(1); // Thoát ứng dụng nếu không kết nối được database
  });

// ==================== GRACEFUL SHUTDOWN ====================
// Xử lý tắt server một cách an toàn (đóng kết nối database trước khi tắt)

// Khi nhận tín hiệu SIGTERM (thường từ Docker hoặc process manager)
process.on("SIGTERM", async () => {
  console.log("\n⚠️  SIGTERM signal received: closing HTTP server");
  await AppDataSource.destroy(); // Đóng kết nối database
  console.log("✅ Database connection closed");
  process.exit(0);
});

// Khi nhận tín hiệu SIGINT (Ctrl+C)
process.on("SIGINT", async () => {
  console.log("\n⚠️  SIGINT signal received: closing HTTP server");
  await AppDataSource.destroy(); // Đóng kết nối database
  console.log("✅ Database connection closed");
  process.exit(0);
});

