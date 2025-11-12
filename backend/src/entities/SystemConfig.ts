import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Admin } from "./Admin";

// ============================================
// ENTITY: SystemConfig - Cấu hình hệ thống
// ============================================
// Entity này tương ứng với bảng "system_configs" trong database
// Một Admin cập nhật nhiều SystemConfigs

@Entity("system_configs") // Tên bảng trong database
export class SystemConfig {
  // Primary Key - Tự động tăng
  @PrimaryGeneratedColumn()
  configId!: number;

  // Key của config - Unique (ví dụ: "site_name", "max_upload_size")
  @Column({ type: "varchar", length: 100, unique: true })
  configKey!: string;

  // Giá trị của config (có thể là JSON string)
  @Column({ type: "text" })
  configValue!: string;

  // Mô tả config - Có thể null
  @Column({ type: "text", nullable: true })
  description?: string;

  // Lần cập nhật cuối - Tự động cập nhật khi có thay đổi
  @UpdateDateColumn({ name: "lastUpdated" })
  lastUpdated!: Date;

  // Foreign Key - ID của Admin cập nhật
  @Column()
  updatedByAdminId!: number;

  // ========== RELATIONS ==========

  // Nhiều SystemConfigs được cập nhật bởi một Admin (Many-to-One)
  @ManyToOne(() => Admin, (admin) => admin.systemConfigs)
  @JoinColumn({ name: "updatedByAdminId" })
  updatedBy!: Admin;
}

