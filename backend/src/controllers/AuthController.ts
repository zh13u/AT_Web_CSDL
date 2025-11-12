import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../middlewares/auth.middleware";

export class AuthController {
  private userRepository = AppDataSource.getRepository(User);

  // POST /api/auth/register - Đăng ký
  async register(req: Request, res: Response) {
    try {
      const { name, email, password, phone, address } = req.body;

      // Validate
      if (!name || !email || !password) {
        return res.status(400).json({
          success: false,
          message: "Thiếu thông tin: name, email, password",
        });
      }

      // Kiểm tra email đã tồn tại chưa
      const existingUser = await this.userRepository.findOne({
        where: { email },
      });

      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Email đã được sử dụng",
        });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Tạo user mới
      const user = this.userRepository.create({
        name,
        email,
        password: hashedPassword,
        phone,
        address,
        role: "customer",
      });

      const savedUser = await this.userRepository.save(user);

      // Tạo token
      const token = this.generateToken(savedUser);

      res.status(201).json({
        success: true,
        message: "Đăng ký thành công",
        data: {
          user: {
            userId: savedUser.userId,
            name: savedUser.name,
            email: savedUser.email,
            role: savedUser.role,
          },
          token,
        },
      });
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({
        success: false,
        message: "Lỗi khi đăng ký",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  // POST /api/auth/login - Đăng nhập
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Thiếu email hoặc password",
        });
      }

      // Tìm user
      const user = await this.userRepository.findOne({
        where: { email },
      });

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Email hoặc password không đúng",
        });
      }

      // Kiểm tra password
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: "Email hoặc password không đúng",
        });
      }

      // Cập nhật lastLogin
      user.lastLogin = new Date();
      await this.userRepository.save(user);

      // Tạo token
      const token = this.generateToken(user);

      res.json({
        success: true,
        message: "Đăng nhập thành công",
        data: {
          user: {
            userId: user.userId,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        },
      });
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({
        success: false,
        message: "Lỗi khi đăng nhập",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  // GET /api/auth/me - Lấy thông tin user hiện tại
  async getMe(req: AuthRequest, res: Response) {
    try {
      const userId = req.userId;

      const user = await this.userRepository.findOne({
        where: { userId },
        select: ["userId", "name", "email", "phone", "address", "role", "dateRegistered", "lastLogin"],
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Không tìm thấy user",
        });
      }

      res.json({
        success: true,
        data: user,
      });
    } catch (error) {
      console.error("Error getting user:", error);
      res.status(500).json({
        success: false,
        message: "Lỗi khi lấy thông tin user",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  // Helper: Tạo JWT token
  private generateToken(user: User): string {
    const jwtSecret = process.env.JWT_SECRET || "your-secret-key";
    const expiresIn = process.env.JWT_EXPIRES_IN || "7d";

    return jwt.sign(
      {
        userId: user.userId,
        email: user.email,
        role: user.role,
      },
      jwtSecret,
      { expiresIn }
    );
  }
}

