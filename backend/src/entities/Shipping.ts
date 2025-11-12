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
// ENTITY: Shipping - Vận chuyển
// ============================================
// Entity này tương ứng với bảng "shippings" trong database
// Một Order có một Shipping (One-to-One, optional)

@Entity("shippings") // Tên bảng trong database
export class Shipping {
  // Primary Key - Tự động tăng
  @PrimaryGeneratedColumn()
  shippingId!: number;

  // Foreign Key - ID của Order (Unique, một Order chỉ có một Shipping)
  @Column({ unique: true })
  orderId!: number;

  // Đơn vị vận chuyển (Vietnam Post, Giao Hàng Nhanh, ...)
  @Column({ type: "varchar", length: 100 })
  carrier!: string;

  // Mã vận đơn - Có thể null (chưa có khi tạo)
  @Column({ type: "varchar", length: 255, nullable: true })
  trackingNumber?: string;

  // Trạng thái vận chuyển
  @Column({
    type: "enum",
    enum: ["pending", "in_transit", "delivered", "failed"],
    default: "pending",
  })
  status!: "pending" | "in_transit" | "delivered" | "failed";

  // Ngày gửi hàng - Tự động tạo khi insert
  @CreateDateColumn({ name: "shippedDate" })
  shippedDate!: Date;

  // Ngày giao hàng dự kiến - Có thể null
  @Column({ type: "datetime", nullable: true })
  estimatedDelivery?: Date;

  // Ngày giao hàng thực tế - Có thể null
  @Column({ type: "datetime", nullable: true })
  actualDelivery?: Date;

  // ========== RELATIONS ==========

  // Một Shipping thuộc về một Order (One-to-One)
  @OneToOne(() => Order, (order: Order) => order.shipping)
  @JoinColumn({ name: "orderId" })
  order!: Order;
}

