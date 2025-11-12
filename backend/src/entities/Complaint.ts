import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User";
import { Order } from "./Order";
import { Admin } from "./Admin";

// ============================================
// ENTITY: Complaint - Khiếu nại
// ============================================
// Entity này tương ứng với bảng "complaints" trong database
// Một User có thể tạo nhiều Complaints về một Order

@Entity("complaints") // Tên bảng trong database
export class Complaint {
  // Primary Key - Tự động tăng
  @PrimaryGeneratedColumn()
  complaintId!: number;

  // Foreign Key - ID của User tạo khiếu nại
  @Column()
  userId!: number;

  // Foreign Key - ID của Order liên quan
  @Column()
  orderId!: number;

  // Nội dung khiếu nại
  @Column({ type: "text" })
  content!: string;

  // Trạng thái khiếu nại
  @Column({
    type: "enum",
    enum: ["pending", "in_progress", "resolved", "rejected"],
    default: "pending",
  })
  status!: "pending" | "in_progress" | "resolved" | "rejected";

  // Ngày tạo khiếu nại - Tự động tạo khi insert
  @CreateDateColumn({ name: "createdAt" })
  createdAt!: Date;

  // Ngày giải quyết - Có thể null
  @Column({ type: "datetime", nullable: true })
  resolvedAt?: Date;

  // Nội dung giải quyết - Có thể null
  @Column({ type: "text", nullable: true })
  resolution?: string;

  // Foreign Key - ID của Admin xử lý (nếu có)
  @Column({ nullable: true })
  handledByAdminId?: number;

  // ========== RELATIONS ==========

  // Nhiều Complaints thuộc về một User (Many-to-One)
  @ManyToOne(() => User, (user) => user.complaints)
  @JoinColumn({ name: "userId" })
  user!: User;

  // Nhiều Complaints liên quan đến một Order (Many-to-One)
  @ManyToOne(() => Order)
  @JoinColumn({ name: "orderId" })
  order!: Order;

  // Nhiều Complaints được xử lý bởi một Admin (Many-to-One, optional)
  @ManyToOne(() => Admin, (admin) => admin.handledComplaints, {
    nullable: true,
  })
  @JoinColumn({ name: "handledByAdminId" })
  handledBy?: Admin;
}

