import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Product } from "./Product";
import { User } from "./User";

// ============================================
// ENTITY: Review - Đánh giá sản phẩm
// ============================================
// Entity này tương ứng với bảng "reviews" trong database
// Một User có thể đánh giá nhiều Products, một Product có nhiều Reviews

@Entity("reviews") // Tên bảng trong database
export class Review {
  // Primary Key - Tự động tăng
  @PrimaryGeneratedColumn()
  reviewId!: number;

  // Foreign Key - ID của Product được đánh giá
  @Column()
  productId!: number;

  // Foreign Key - ID của User đánh giá
  @Column()
  userId!: number;

  // Điểm đánh giá (1-5 sao)
  @Column({ type: "int" })
  rating!: number;

  // Bình luận - Có thể null
  @Column({ type: "text", nullable: true })
  comment?: string;

  // Ngày đánh giá - Tự động tạo khi insert
  @CreateDateColumn({ name: "reviewDate" })
  reviewDate!: Date;

  // Đã xác minh mua hàng chưa (true = đã mua, false = chưa mua)
  @Column({ type: "boolean", default: false })
  isVerified!: boolean;

  // ========== RELATIONS ==========

  // Nhiều Reviews thuộc về một Product (Many-to-One)
  @ManyToOne(() => Product, (product) => product.reviews)
  @JoinColumn({ name: "productId" })
  product!: Product;

  // Nhiều Reviews thuộc về một User (Many-to-One)
  @ManyToOne(() => User, (user) => user.reviews)
  @JoinColumn({ name: "userId" })
  user!: User;
}

