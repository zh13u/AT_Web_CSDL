import { DataSource } from "typeorm";
import * as dotenv from "dotenv";

// ============================================
// DATA SOURCE - Cấu hình kết nối Database
// ============================================
// File này định nghĩa cách TypeORM kết nối đến MySQL database
// Được sử dụng bởi:
//   - Server để kết nối database khi khởi động
//   - Migration để chạy migrations

// Load biến môi trường từ file .env
dotenv.config();

// Tạo DataSource với cấu hình từ .env
export const AppDataSource = new DataSource({
  type: "mysql", // Loại database: MySQL
  
  // Thông tin kết nối (lấy từ file .env)
  host: process.env.DB_HOST || "localhost",        // Địa chỉ MySQL server
  port: parseInt(process.env.DB_PORT || "3306"),    // Port MySQL (mặc định 3306)
  username: process.env.DB_USERNAME || "phone_shop_user",  // Username
  password: process.env.DB_PASSWORD || "phone_shop_password", // Password
  database: process.env.DB_DATABASE || "phone_shop_db",    // Tên database
  
  // QUAN TRỌNG: synchronize = false
  // Nếu = true, TypeORM sẽ tự động sync schema (nguy hiểm trong production!)
  // Luôn dùng migrations để quản lý schema
  synchronize: false,
  
  // Log SQL queries trong development mode (để debug)
  logging: process.env.NODE_ENV === "development",
  
  // Đường dẫn đến các entities (models) - sẽ tạo sau
  entities: [__dirname + "/entities/**/*.{ts,js}"],
  
  // Đường dẫn đến các migration files - sẽ tạo sau
  migrations: [__dirname + "/migrations/**/*.{ts,js}"],
  
  // Đường dẫn đến các subscribers (nếu có) - tùy chọn
  subscribers: [__dirname + "/subscribers/**/*.{ts,js}"],
});

