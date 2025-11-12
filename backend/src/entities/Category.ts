import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";
import { Product } from "./Product";

// ============================================
// ENTITY: Category - Danh mục sản phẩm
// ============================================
// Entity này tương ứng với bảng "categories" trong database
// Mỗi Category có nhiều Products

@Entity("categories") // Tên bảng trong database
export class Category {
  // Primary Key - Tự động tăng
  @PrimaryGeneratedColumn()
  categoryId!: number; // Dấu ! nghĩa là property này sẽ được gán giá trị (bởi database)

  // Tên danh mục - Unique (không trùng lặp)
  @Column({ type: "varchar", length: 255, unique: true })
  categoryName!: string;

  // Mô tả danh mục - Có thể null
  @Column({ type: "text", nullable: true })
  description?: string; // Dấu ? nghĩa là optional (có thể null)

  // ========== RELATIONS ==========
  // Một Category có nhiều Products
  @OneToMany(() => Product, (product) => product.category)
  products!: Product[]; // Mảng các products thuộc category này
}

