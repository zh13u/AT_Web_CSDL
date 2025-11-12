import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User";

// ============================================
// ENTITY: Notification - Thông báo
// ============================================
// Entity này tương ứng với bảng "notifications" trong database
// Một User có nhiều Notifications

@Entity("notifications") // Tên bảng trong database
export class Notification {
  // Primary Key - Tự động tăng
  @PrimaryGeneratedColumn()
  notificationId!: number;

  // Foreign Key - ID của User nhận thông báo
  @Column()
  userId!: number;

  // Tiêu đề thông báo
  @Column({ type: "varchar", length: 255 })
  title!: string;

  // Nội dung thông báo
  @Column({ type: "text" })
  message!: string;

  // Loại thông báo (order, promotion, system, ...)
  @Column({ type: "varchar", length: 50 })
  type!: string;

  // Đã đọc chưa
  @Column({ type: "boolean", default: false })
  isRead!: boolean;

  // Ngày tạo thông báo - Tự động tạo khi insert
  @CreateDateColumn({ name: "createdAt" })
  createdAt!: Date;

  // ========== RELATIONS ==========

  // Nhiều Notifications thuộc về một User (Many-to-One)
  @ManyToOne(() => User, (user) => user.notifications)
  @JoinColumn({ name: "userId" })
  user!: User;
}

