import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Order } from "./Order";

// ============================================
// ENTITY: Payment - Thanh toán
// ============================================
// Entity này tương ứng với bảng "payments" trong database
// Một Order có một Payment (One-to-One)

@Entity("payments") // Tên bảng trong database
export class Payment {
  // Primary Key - Tự động tăng
  @PrimaryGeneratedColumn()
  paymentId!: number;

  // Foreign Key - ID của Order (Unique, một Order chỉ có một Payment)
  @Column({ unique: true })
  orderId!: number;

  // Số tiền thanh toán
  @Column({ type: "decimal", precision: 10, scale: 2 })
  amount!: number;

  // Phương thức thanh toán (cash, credit_card, bank_transfer, ...)
  @Column({ type: "varchar", length: 50 })
  method!: string;

  // Trạng thái thanh toán
  @Column({
    type: "enum",
    enum: ["pending", "completed", "failed", "refunded"],
    default: "pending",
  })
  status!: "pending" | "completed" | "failed" | "refunded";

  // Ngày thanh toán - Tự động tạo khi insert
  @CreateDateColumn({ name: "paymentDate" })
  paymentDate!: Date;

  // Mã giao dịch từ payment gateway (nếu có)
  @Column({ type: "varchar", length: 255, nullable: true })
  transactionId?: string;

  // ========== RELATIONS ==========

  // Một Payment thuộc về một Order (One-to-One)
  @OneToOne(() => Order, (order: Order) => order.payment)
  @JoinColumn({ name: "orderId" })
  order!: Order;
}

