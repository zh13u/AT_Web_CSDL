import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";
import { Order } from "./Order";

// ============================================
// ENTITY: Voucher - Mã giảm giá
// ============================================
// Entity này tương ứng với bảng "vouchers" trong database
// Một Voucher có thể được dùng trong nhiều Orders

@Entity("vouchers") // Tên bảng trong database
export class Voucher {
  // Primary Key - Tự động tăng
  @PrimaryGeneratedColumn()
  voucherId!: number;

  // Mã voucher - Unique (không trùng lặp)
  @Column({ type: "varchar", length: 50, unique: true })
  code!: string;

  // Số tiền giảm (ví dụ: 50000 VNĐ)
  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  discountAmount!: number;

  // Phần trăm giảm (ví dụ: 10% = 10.00)
  @Column({ type: "decimal", precision: 5, scale: 2, default: 0 })
  discountPercent!: number;

  // Ngày hết hạn
  @Column({ type: "datetime" })
  expiryDate!: Date;

  // Số tiền đơn hàng tối thiểu để dùng voucher
  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  minOrderAmount!: number;

  // Trạng thái hoạt động
  @Column({ type: "boolean", default: true })
  isActive!: boolean;

  // Giới hạn số lần sử dụng (0 = không giới hạn)
  @Column({ type: "int", default: 0 })
  usageLimit!: number;

  // Số lần đã sử dụng
  @Column({ type: "int", default: 0 })
  usedCount!: number;

  // ========== RELATIONS ==========
  // Một Voucher có thể được dùng trong nhiều Orders
  @OneToMany(() => Order, (order) => order.voucher)
  orders!: Order[];
}

