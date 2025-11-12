import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { User } from "./User";
import { Product } from "./Product";
import { Order } from "./Order";
import { Complaint } from "./Complaint";
import { Report } from "./Report";
import { SystemConfig } from "./SystemConfig";

// ============================================
// ENTITY: Admin - Quản trị viên
// ============================================
// Entity này tương ứng với bảng "admins" trong database
// Admin kế thừa từ User (One-to-One relationship)
// Một User có thể là một Admin

@Entity("admins") // Tên bảng trong database
export class Admin {
  // Primary Key - Cùng ID với User (không tự tăng, lấy từ User)
  @PrimaryColumn()
  adminId!: number;

  // Ngày tạo admin - Tự động tạo khi insert
  @CreateDateColumn({ name: "dateCreated" })
  dateCreated!: Date;

  // ========== RELATIONS ==========

  // Một Admin là một User (One-to-One)
  @OneToOne(() => User, (user) => user.admin)
  @JoinColumn({ name: "adminId" }) // adminId = userId
  user!: User;

  // Một Admin quản lý nhiều Products
  @OneToMany(() => Product, (product) => product.managedBy)
  products!: Product[];

  // Một Admin xử lý nhiều Orders
  @OneToMany(() => Order, (order) => order.processedBy)
  processedOrders!: Order[];

  // Một Admin xử lý nhiều Complaints
  @OneToMany(() => Complaint, (complaint) => complaint.handledBy)
  handledComplaints!: Complaint[];

  // Một Admin tạo nhiều Reports
  @OneToMany(() => Report, (report) => report.admin)
  reports!: Report[];

  // Một Admin cập nhật nhiều SystemConfigs
  @OneToMany(() => SystemConfig, (config) => config.updatedBy)
  systemConfigs!: SystemConfig[];
}

