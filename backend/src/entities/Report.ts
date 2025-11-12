import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Admin } from "./Admin";

// ============================================
// ENTITY: Report - Báo cáo
// ============================================
// Entity này tương ứng với bảng "reports" trong database
// Một Admin tạo nhiều Reports

@Entity("reports") // Tên bảng trong database
export class Report {
  // Primary Key - Tự động tăng
  @PrimaryGeneratedColumn()
  reportId!: number;

  // Foreign Key - ID của Admin tạo báo cáo
  @Column()
  adminId!: number;

  // Loại báo cáo (sales, inventory, users, ...)
  @Column({ type: "varchar", length: 100 })
  reportType!: string;

  // Ngày tạo báo cáo - Tự động tạo khi insert
  @CreateDateColumn({ name: "generatedDate" })
  generatedDate!: Date;

  // Nội dung báo cáo (JSON hoặc text)
  @Column({ type: "text" })
  content!: string;

  // Kỳ báo cáo (daily, weekly, monthly, ...)
  @Column({ type: "varchar", length: 50, nullable: true })
  period?: string;

  // ========== RELATIONS ==========

  // Nhiều Reports được tạo bởi một Admin (Many-to-One)
  @ManyToOne(() => Admin, (admin) => admin.reports)
  @JoinColumn({ name: "adminId" })
  admin!: Admin;
}

