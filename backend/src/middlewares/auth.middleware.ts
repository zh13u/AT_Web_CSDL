import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// ============================================
// MIDDLEWARE: Authentication
// ============================================
// Middleware để xác thực JWT token

export interface AuthRequest extends Request {
  userId?: number;
  userRole?: string;
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // Lấy token từ header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Không có token hoặc token không hợp lệ",
      });
    }

    const token = authHeader.substring(7); // Bỏ "Bearer "
    const jwtSecret = process.env.JWT_SECRET || "your-secret-key";

    // Verify token
    const decoded = jwt.verify(token, jwtSecret) as {
      userId: number;
      email: string;
      role: string;
    };

    // Gán thông tin user vào request
    req.userId = decoded.userId;
    req.userRole = decoded.role;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Token không hợp lệ hoặc đã hết hạn",
    });
  }
};

// Middleware chỉ cho phép Admin
export const adminMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.userRole !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Chỉ admin mới có quyền truy cập",
    });
  }
  next();
};
