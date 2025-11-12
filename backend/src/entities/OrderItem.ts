import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Order } from "./Order";
import { Product } from "./Product";

// ============================================
// ENTITY: OrderItem - Chi tiết sản phẩm trong đơn hàng
// ============================================
// Entity này tương ứng với bảng "order_items" trong database
// Một Order có nhiều OrderItems, mỗi OrderItem là một sản phẩm

@Entity("order_items") // Tên bảng trong database
export class OrderItem {
  // Primary Key - Tự động tăng
  @PrimaryGeneratedColumn()
  orderItemId!: number;

  // Foreign Key - ID của Order
  @Column()
  orderId!: number;

  // Foreign Key - ID của Product
  @Column()
  productId!: number;

  // Số lượng sản phẩm
  @Column({ type: "int" })
  quantity!: number;

  // Giá sản phẩm tại thời điểm đặt hàng (lưu lại để không bị ảnh hưởng khi giá thay đổi)
  @Column({ type: "decimal", precision: 10, scale: 2 })
  price!: number;

  // Tổng tiền của item này (price * quantity)
  @Column({ type: "decimal", precision: 10, scale: 2 })
  subtotal!: number;

  // ========== RELATIONS ==========

  // Nhiều OrderItems thuộc về một Order (Many-to-One)
  @ManyToOne(() => Order, (order) => order.items, {
    onDelete: "CASCADE", // Xóa OrderItem khi xóa Order
  })
  @JoinColumn({ name: "orderId" })
  order!: Order;

  // Nhiều OrderItems tham chiếu đến một Product (Many-to-One)
  @ManyToOne(() => Product, (product) => product.orderItems)
  @JoinColumn({ name: "productId" })
  product!: Product;
}

