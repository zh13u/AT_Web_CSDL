import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
  OneToMany,
} from "typeorm";
import { User } from "./User";
import { Voucher } from "./Voucher";
import { Admin } from "./Admin";
import { OrderItem } from "./OrderItem";
import { Payment } from "./Payment";
import { Shipping } from "./Shipping";

// ============================================
// ENTITY: Order - Đơn hàng
// ============================================
// Entity này tương ứng với bảng "orders" trong database
// Một User có nhiều Orders, một Order có nhiều OrderItems

@Entity("orders") // Tên bảng trong database
export class Order {
  // Primary Key - Tự động tăng
  @PrimaryGeneratedColumn()
  orderId!: number;

  // Foreign Key - ID của User đặt hàng
  @Column()
  userId!: number;

  // Ngày đặt hàng - Tự động tạo khi insert
  @CreateDateColumn({ name: "orderDate" })
  orderDate!: Date;

  // Trạng thái đơn hàng
  @Column({
    type: "enum",
    enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
    default: "pending",
  })
  status!: "pending" | "processing" | "shipped" | "delivered" | "cancelled";

  // Tổng tiền đơn hàng
  @Column({ type: "decimal", precision: 10, scale: 2 })
  totalAmount!: number;

  // Phương thức thanh toán
  @Column({ type: "varchar", length: 50 })
  paymentMethod!: string;

  // Địa chỉ giao hàng
  @Column({ type: "text" })
  shippingAddress!: string;

  // Số tiền được giảm (từ voucher)
  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  discountAmount!: number;

  // Ngày giao hàng dự kiến - Có thể null
  @Column({ type: "datetime", nullable: true })
  deliveryDate?: Date;

  // Foreign Key - ID của Voucher (nếu có)
  @Column({ nullable: true })
  voucherId?: number;

  // Foreign Key - ID của Admin xử lý đơn (nếu có)
  @Column({ nullable: true })
  processedByAdminId?: number;

  // Nhiều Orders được xử lý bởi một Admin (Many-to-One, optional)
  @ManyToOne(() => Admin, (admin) => admin.processedOrders, { nullable: true })
  @JoinColumn({ name: "processedByAdminId" })
  processedBy?: Admin;

  // ========== RELATIONS ==========

  // Nhiều Orders thuộc về một User (Many-to-One)
  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: "userId" })
  user!: User;

  // Nhiều Orders có thể dùng một Voucher (Many-to-One, optional)
  @ManyToOne(() => Voucher, (voucher) => voucher.orders, { nullable: true })
  @JoinColumn({ name: "voucherId" })
  voucher?: Voucher;

  // Một Order có nhiều OrderItems
  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, {
    cascade: true, // Tự động xóa OrderItems khi xóa Order
  })
  items!: OrderItem[];

  // Một Order có một Payment (One-to-One)
  @OneToOne(() => Payment, (payment) => payment.order)
  payment!: Payment;

  // Một Order có một Shipping (One-to-One, optional)
  @OneToOne(() => Shipping, (shipping) => shipping.order)
  shipping?: Shipping;
}

