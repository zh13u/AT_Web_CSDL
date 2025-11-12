import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Cart } from "./Cart";
import { Product } from "./Product";

// ============================================
// ENTITY: CartItem - Chi tiết sản phẩm trong giỏ hàng
// ============================================
// Entity này tương ứng với bảng "cart_items" trong database
// Một Cart có nhiều CartItems, mỗi CartItem là một sản phẩm

@Entity("cart_items") // Tên bảng trong database
export class CartItem {
  // Primary Key - Tự động tăng
  @PrimaryGeneratedColumn()
  cartItemId!: number;

  // Foreign Key - ID của Cart
  @Column()
  cartId!: number;

  // Foreign Key - ID của Product
  @Column()
  productId!: number;

  // Số lượng sản phẩm
  @Column({ type: "int", default: 1 })
  quantity!: number;

  // Tổng tiền của item này (price * quantity)
  @Column({ type: "decimal", precision: 10, scale: 2 })
  subtotal!: number;

  // ========== RELATIONS ==========

  // Nhiều CartItems thuộc về một Cart (Many-to-One)
  @ManyToOne(() => Cart, (cart) => cart.items, {
    onDelete: "CASCADE", // Xóa CartItem khi xóa Cart
  })
  @JoinColumn({ name: "cartId" })
  cart!: Cart;

  // Nhiều CartItems tham chiếu đến một Product (Many-to-One)
  @ManyToOne(() => Product, (product) => product.cartItems)
  @JoinColumn({ name: "productId" })
  product!: Product;
}

