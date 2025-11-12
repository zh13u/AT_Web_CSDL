import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { User } from "./User";
import { CartItem } from "./CartItem";

// ============================================
// ENTITY: Cart - Giỏ hàng
// ============================================
// Entity này tương ứng với bảng "carts" trong database
// Một User có một Cart, một Cart có nhiều CartItems

@Entity("carts") // Tên bảng trong database
export class Cart {
  // Primary Key - Tự động tăng
  @PrimaryGeneratedColumn()
  cartId!: number;

  // Foreign Key - ID của User sở hữu giỏ hàng
  @Column()
  userId!: number;

  // Tổng giá trị giỏ hàng
  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  totalPrice!: number;

  // Lần cập nhật cuối - Tự động cập nhật khi có thay đổi
  @UpdateDateColumn({ name: "lastUpdated" })
  lastUpdated!: Date;

  // ========== RELATIONS ==========

  // Nhiều Carts thuộc về một User (Many-to-One)
  @ManyToOne(() => User, (user) => user.carts)
  @JoinColumn({ name: "userId" })
  user!: User;

  // Một Cart có nhiều CartItems
  @OneToMany(() => CartItem, (cartItem) => cartItem.cart, {
    cascade: true, // Tự động xóa CartItems khi xóa Cart
  })
  items!: CartItem[];
}

