import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Category } from "./Category";
import { CartItem } from "./CartItem";
import { OrderItem } from "./OrderItem";
import { Review } from "./Review";
import { Admin } from "./Admin";

// ============================================
// ENTITY: Product - Sản phẩm
// ============================================
// Entity này tương ứng với bảng "products" trong database
// Một Product thuộc về một Category

@Entity("products") // Tên bảng trong database
export class Product {
  // Primary Key - Tự động tăng
  @PrimaryGeneratedColumn()
  productId!: number;

  // Tên sản phẩm
  @Column({ type: "varchar", length: 255 })
  name!: string;

  // Mô tả sản phẩm - Có thể null
  @Column({ type: "text", nullable: true })
  description?: string;

  // Giá sản phẩm - Decimal (10,2) = 99999999.99
  @Column({ type: "decimal", precision: 10, scale: 2 })
  price!: number;

  // Số lượng tồn kho
  @Column({ type: "int", default: 0 })
  stock!: number;

  // Foreign Key - ID của Category
  @Column()
  categoryId!: number;

  // Thương hiệu (brand)
  @Column({ type: "varchar", length: 100 })
  brand!: string;

  // URL hình ảnh - Có thể null
  @Column({ type: "varchar", length: 500, nullable: true })
  imageUrl?: string;

  // Đánh giá trung bình (0.00 - 5.00)
  @Column({ type: "decimal", precision: 3, scale: 2, default: 0 })
  rating!: number;

  // Ngày thêm sản phẩm - Tự động tạo khi insert
  @CreateDateColumn({ name: "dateAdded" })
  dateAdded!: Date;

  // Trạng thái hoạt động (true = đang bán, false = ngừng bán)
  @Column({ type: "boolean", default: true })
  isActive!: boolean;

  // Foreign Key - ID của Admin quản lý sản phẩm (nếu có)
  @Column({ nullable: true })
  managedByAdminId?: number;

  // ========== RELATIONS ==========

  // Nhiều Products thuộc về một Category (Many-to-One)
  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: "categoryId" }) // Tên cột Foreign Key trong database
  category!: Category;

  // Nhiều Products được quản lý bởi một Admin (Many-to-One, optional)
  @ManyToOne(() => Admin, (admin) => admin.products, { nullable: true })
  @JoinColumn({ name: "managedByAdminId" })
  managedBy?: Admin;

  // Một Product có nhiều CartItems
  @OneToMany(() => CartItem, (cartItem) => cartItem.product)
  cartItems!: CartItem[];

  // Một Product có nhiều OrderItems
  @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
  orderItems!: OrderItem[];

  // Một Product có nhiều Reviews
  @OneToMany(() => Review, (review) => review.product)
  reviews!: Review[];
}

