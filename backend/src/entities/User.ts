import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
  OneToMany,
} from "typeorm";
import { Admin } from "./Admin";
import { Order } from "./Order";
import { Cart } from "./Cart";
import { Review } from "./Review";
import { Notification } from "./Notification";
import { Complaint } from "./Complaint";

// ============================================
// ENTITY: User - Người dùng
// ============================================
// Entity này tương ứng với bảng "users" trong database
// Một User có thể là customer hoặc admin

@Entity("users") // Tên bảng trong database
export class User {
  // Primary Key - Tự động tăng
  @PrimaryGeneratedColumn()
  userId!: number;

  // Tên người dùng
  @Column({ type: "varchar", length: 255 })
  name!: string;

  // Email - Unique (không trùng lặp)
  @Column({ type: "varchar", length: 255, unique: true })
  email!: string;

  // Password - Đã được hash (mã hóa)
  @Column({ type: "varchar", length: 255 })
  password!: string;

  // Số điện thoại - Có thể null
  @Column({ type: "varchar", length: 20, nullable: true })
  phone?: string;

  // Địa chỉ - Có thể null
  @Column({ type: "text", nullable: true })
  address?: string;

  // Vai trò: customer hoặc admin
  @Column({
    type: "enum",
    enum: ["customer", "admin"],
    default: "customer", // Mặc định là customer
  })
  role!: "customer" | "admin";

  // Ngày đăng ký - Tự động tạo khi insert
  @CreateDateColumn({ name: "dateRegistered" })
  dateRegistered!: Date;

  // Lần đăng nhập cuối - Có thể null
  @Column({ type: "datetime", nullable: true })
  lastLogin?: Date;

  // ========== RELATIONS ==========
  // Sẽ bật lại sau khi tạo các entities liên quan
  
  // Một User có thể là một Admin (1-1)
  @OneToOne(() => Admin, (admin) => admin.user)
  admin?: Admin;

  // Một User có nhiều Orders
  @OneToMany(() => Order, (order) => order.user)
  orders!: Order[];

  // Một User có nhiều Carts
  @OneToMany(() => Cart, (cart) => cart.user)
  carts!: Cart[];

  // Một User có nhiều Reviews
  @OneToMany(() => Review, (review) => review.user)
  reviews!: Review[];

  // Một User có nhiều Notifications
  @OneToMany(() => Notification, (notification) => notification.user)
  notifications!: Notification[];

  // Một User có nhiều Complaints
  @OneToMany(() => Complaint, (complaint) => complaint.user)
  complaints!: Complaint[];
}

