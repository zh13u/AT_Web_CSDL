import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from "typeorm";

// ============================================
// MIGRATION: Create Remaining Tables
// ============================================
// Migration này tạo các bảng còn lại:
// - admins
// - vouchers
// - orders
// - order_items
// - payments
// - shippings
// - reviews
// - complaints
// - notifications
// - reports
// - system_configs

export class CreateRemainingTables1700000000001 implements MigrationInterface {
  // ========== UP: Tạo bảng ==========
  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1. Tạo bảng admins
    await queryRunner.createTable(
      new Table({
        name: "admins",
        columns: [
          {
            name: "adminId",
            type: "int",
            isPrimary: true,
            // KHÔNG tự động tăng vì adminId = userId
          },
          {
            name: "dateCreated",
            type: "datetime",
            default: "CURRENT_TIMESTAMP",
          },
        ],
      }),
      true
    );

    // Foreign Key: admins.adminId → users.userId
    await queryRunner.createForeignKey(
      "admins",
      new TableForeignKey({
        columnNames: ["adminId"],
        referencedColumnNames: ["userId"],
        referencedTableName: "users",
        onDelete: "CASCADE", // Xóa admin khi xóa user
      })
    );

    // 2. Tạo bảng vouchers
    await queryRunner.createTable(
      new Table({
        name: "vouchers",
        columns: [
          {
            name: "voucherId",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "code",
            type: "varchar",
            length: "50",
            isUnique: true,
          },
          {
            name: "discountAmount",
            type: "decimal",
            precision: 10,
            scale: 2,
            default: 0,
          },
          {
            name: "discountPercent",
            type: "decimal",
            precision: 5,
            scale: 2,
            default: 0,
          },
          {
            name: "expiryDate",
            type: "datetime",
          },
          {
            name: "minOrderAmount",
            type: "decimal",
            precision: 10,
            scale: 2,
            default: 0,
          },
          {
            name: "isActive",
            type: "boolean",
            default: true,
          },
          {
            name: "usageLimit",
            type: "int",
            default: 0,
          },
          {
            name: "usedCount",
            type: "int",
            default: 0,
          },
        ],
      }),
      true
    );

    // 3. Tạo bảng orders
    await queryRunner.createTable(
      new Table({
        name: "orders",
        columns: [
          {
            name: "orderId",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "userId",
            type: "int",
          },
          {
            name: "orderDate",
            type: "datetime",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "status",
            type: "enum",
            enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
            default: "'pending'",
          },
          {
            name: "totalAmount",
            type: "decimal",
            precision: 10,
            scale: 2,
          },
          {
            name: "paymentMethod",
            type: "varchar",
            length: "50",
          },
          {
            name: "shippingAddress",
            type: "text",
          },
          {
            name: "discountAmount",
            type: "decimal",
            precision: 10,
            scale: 2,
            default: 0,
          },
          {
            name: "deliveryDate",
            type: "datetime",
            isNullable: true,
          },
          {
            name: "voucherId",
            type: "int",
            isNullable: true,
          },
          {
            name: "processedByAdminId",
            type: "int",
            isNullable: true,
          },
        ],
      }),
      true
    );

    // Foreign Keys cho orders
    await queryRunner.createForeignKey(
      "orders",
      new TableForeignKey({
        columnNames: ["userId"],
        referencedColumnNames: ["userId"],
        referencedTableName: "users",
        onDelete: "RESTRICT", // Không cho xóa user nếu còn orders
      })
    );

    await queryRunner.createForeignKey(
      "orders",
      new TableForeignKey({
        columnNames: ["voucherId"],
        referencedColumnNames: ["voucherId"],
        referencedTableName: "vouchers",
        onDelete: "SET NULL", // Set null nếu voucher bị xóa
      })
    );

    await queryRunner.createForeignKey(
      "orders",
      new TableForeignKey({
        columnNames: ["processedByAdminId"],
        referencedColumnNames: ["adminId"],
        referencedTableName: "admins",
        onDelete: "SET NULL", // Set null nếu admin bị xóa
      })
    );

    // 4. Tạo bảng order_items
    await queryRunner.createTable(
      new Table({
        name: "order_items",
        columns: [
          {
            name: "orderItemId",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "orderId",
            type: "int",
          },
          {
            name: "productId",
            type: "int",
          },
          {
            name: "quantity",
            type: "int",
          },
          {
            name: "price",
            type: "decimal",
            precision: 10,
            scale: 2,
          },
          {
            name: "subtotal",
            type: "decimal",
            precision: 10,
            scale: 2,
          },
        ],
      }),
      true
    );

    // Foreign Keys cho order_items
    await queryRunner.createForeignKey(
      "order_items",
      new TableForeignKey({
        columnNames: ["orderId"],
        referencedColumnNames: ["orderId"],
        referencedTableName: "orders",
        onDelete: "CASCADE", // Xóa order_items khi xóa order
      })
    );

    await queryRunner.createForeignKey(
      "order_items",
      new TableForeignKey({
        columnNames: ["productId"],
        referencedColumnNames: ["productId"],
        referencedTableName: "products",
        onDelete: "RESTRICT", // Không cho xóa product nếu còn trong order
      })
    );

    // 5. Tạo bảng payments
    await queryRunner.createTable(
      new Table({
        name: "payments",
        columns: [
          {
            name: "paymentId",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "orderId",
            type: "int",
            isUnique: true, // Một order chỉ có một payment
          },
          {
            name: "amount",
            type: "decimal",
            precision: 10,
            scale: 2,
          },
          {
            name: "method",
            type: "varchar",
            length: "50",
          },
          {
            name: "status",
            type: "enum",
            enum: ["pending", "completed", "failed", "refunded"],
            default: "'pending'",
          },
          {
            name: "paymentDate",
            type: "datetime",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "transactionId",
            type: "varchar",
            length: "255",
            isNullable: true,
          },
        ],
      }),
      true
    );

    // Foreign Key: payments.orderId → orders.orderId
    await queryRunner.createForeignKey(
      "payments",
      new TableForeignKey({
        columnNames: ["orderId"],
        referencedColumnNames: ["orderId"],
        referencedTableName: "orders",
        onDelete: "CASCADE", // Xóa payment khi xóa order
      })
    );

    // 6. Tạo bảng shippings
    await queryRunner.createTable(
      new Table({
        name: "shippings",
        columns: [
          {
            name: "shippingId",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "orderId",
            type: "int",
            isUnique: true, // Một order chỉ có một shipping
          },
          {
            name: "carrier",
            type: "varchar",
            length: "100",
          },
          {
            name: "trackingNumber",
            type: "varchar",
            length: "255",
            isNullable: true,
          },
          {
            name: "status",
            type: "enum",
            enum: ["pending", "in_transit", "delivered", "failed"],
            default: "'pending'",
          },
          {
            name: "shippedDate",
            type: "datetime",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "estimatedDelivery",
            type: "datetime",
            isNullable: true,
          },
          {
            name: "actualDelivery",
            type: "datetime",
            isNullable: true,
          },
        ],
      }),
      true
    );

    // Foreign Key: shippings.orderId → orders.orderId
    await queryRunner.createForeignKey(
      "shippings",
      new TableForeignKey({
        columnNames: ["orderId"],
        referencedColumnNames: ["orderId"],
        referencedTableName: "orders",
        onDelete: "CASCADE", // Xóa shipping khi xóa order
      })
    );

    // 7. Tạo bảng reviews
    await queryRunner.createTable(
      new Table({
        name: "reviews",
        columns: [
          {
            name: "reviewId",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "productId",
            type: "int",
          },
          {
            name: "userId",
            type: "int",
          },
          {
            name: "rating",
            type: "int",
          },
          {
            name: "comment",
            type: "text",
            isNullable: true,
          },
          {
            name: "reviewDate",
            type: "datetime",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "isVerified",
            type: "boolean",
            default: false,
          },
        ],
      }),
      true
    );

    // Foreign Keys cho reviews
    await queryRunner.createForeignKey(
      "reviews",
      new TableForeignKey({
        columnNames: ["productId"],
        referencedColumnNames: ["productId"],
        referencedTableName: "products",
        onDelete: "CASCADE", // Xóa reviews khi xóa product
      })
    );

    await queryRunner.createForeignKey(
      "reviews",
      new TableForeignKey({
        columnNames: ["userId"],
        referencedColumnNames: ["userId"],
        referencedTableName: "users",
        onDelete: "CASCADE", // Xóa reviews khi xóa user
      })
    );

    // 8. Tạo bảng complaints
    await queryRunner.createTable(
      new Table({
        name: "complaints",
        columns: [
          {
            name: "complaintId",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "userId",
            type: "int",
          },
          {
            name: "orderId",
            type: "int",
          },
          {
            name: "content",
            type: "text",
          },
          {
            name: "status",
            type: "enum",
            enum: ["pending", "in_progress", "resolved", "rejected"],
            default: "'pending'",
          },
          {
            name: "createdAt",
            type: "datetime",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "resolvedAt",
            type: "datetime",
            isNullable: true,
          },
          {
            name: "resolution",
            type: "text",
            isNullable: true,
          },
          {
            name: "handledByAdminId",
            type: "int",
            isNullable: true,
          },
        ],
      }),
      true
    );

    // Foreign Keys cho complaints
    await queryRunner.createForeignKey(
      "complaints",
      new TableForeignKey({
        columnNames: ["userId"],
        referencedColumnNames: ["userId"],
        referencedTableName: "users",
        onDelete: "CASCADE", // Xóa complaints khi xóa user
      })
    );

    await queryRunner.createForeignKey(
      "complaints",
      new TableForeignKey({
        columnNames: ["orderId"],
        referencedColumnNames: ["orderId"],
        referencedTableName: "orders",
        onDelete: "CASCADE", // Xóa complaints khi xóa order
      })
    );

    await queryRunner.createForeignKey(
      "complaints",
      new TableForeignKey({
        columnNames: ["handledByAdminId"],
        referencedColumnNames: ["adminId"],
        referencedTableName: "admins",
        onDelete: "SET NULL", // Set null nếu admin bị xóa
      })
    );

    // 9. Tạo bảng notifications
    await queryRunner.createTable(
      new Table({
        name: "notifications",
        columns: [
          {
            name: "notificationId",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "userId",
            type: "int",
          },
          {
            name: "title",
            type: "varchar",
            length: "255",
          },
          {
            name: "message",
            type: "text",
          },
          {
            name: "type",
            type: "varchar",
            length: "50",
          },
          {
            name: "isRead",
            type: "boolean",
            default: false,
          },
          {
            name: "createdAt",
            type: "datetime",
            default: "CURRENT_TIMESTAMP",
          },
        ],
      }),
      true
    );

    // Foreign Key: notifications.userId → users.userId
    await queryRunner.createForeignKey(
      "notifications",
      new TableForeignKey({
        columnNames: ["userId"],
        referencedColumnNames: ["userId"],
        referencedTableName: "users",
        onDelete: "CASCADE", // Xóa notifications khi xóa user
      })
    );

    // 10. Tạo bảng reports
    await queryRunner.createTable(
      new Table({
        name: "reports",
        columns: [
          {
            name: "reportId",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "adminId",
            type: "int",
          },
          {
            name: "reportType",
            type: "varchar",
            length: "100",
          },
          {
            name: "generatedDate",
            type: "datetime",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "content",
            type: "text",
          },
          {
            name: "period",
            type: "varchar",
            length: "50",
            isNullable: true,
          },
        ],
      }),
      true
    );

    // Foreign Key: reports.adminId → admins.adminId
    await queryRunner.createForeignKey(
      "reports",
      new TableForeignKey({
        columnNames: ["adminId"],
        referencedColumnNames: ["adminId"],
        referencedTableName: "admins",
        onDelete: "RESTRICT", // Không cho xóa admin nếu còn reports
      })
    );

    // 11. Tạo bảng system_configs
    await queryRunner.createTable(
      new Table({
        name: "system_configs",
        columns: [
          {
            name: "configId",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "configKey",
            type: "varchar",
            length: "100",
            isUnique: true,
          },
          {
            name: "configValue",
            type: "text",
          },
          {
            name: "description",
            type: "text",
            isNullable: true,
          },
          {
            name: "lastUpdated",
            type: "datetime",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
          },
          {
            name: "updatedByAdminId",
            type: "int",
          },
        ],
      }),
      true
    );

    // Foreign Key: system_configs.updatedByAdminId → admins.adminId
    await queryRunner.createForeignKey(
      "system_configs",
      new TableForeignKey({
        columnNames: ["updatedByAdminId"],
        referencedColumnNames: ["adminId"],
        referencedTableName: "admins",
        onDelete: "RESTRICT", // Không cho xóa admin nếu còn configs
      })
    );

    // 12. Thêm cột managedByAdminId vào bảng products (nếu chưa có)
    const productsTable = await queryRunner.getTable("products");
    const managedByColumn = productsTable?.findColumnByName("managedByAdminId");
    if (!managedByColumn) {
      await queryRunner.addColumn(
        "products",
        new TableColumn({
          name: "managedByAdminId",
          type: "int",
          isNullable: true,
        })
      );

      // Foreign Key: products.managedByAdminId → admins.adminId
      await queryRunner.createForeignKey(
        "products",
        new TableForeignKey({
          columnNames: ["managedByAdminId"],
          referencedColumnNames: ["adminId"],
          referencedTableName: "admins",
          onDelete: "SET NULL", // Set null nếu admin bị xóa
        })
      );
    }
  }

  // ========== DOWN: Xóa bảng (rollback) ==========
  public async down(queryRunner: QueryRunner): Promise<void> {
    // Xóa Foreign Keys trước
    const systemConfigsTable = await queryRunner.getTable("system_configs");
    if (systemConfigsTable) {
      const foreignKeys = systemConfigsTable.foreignKeys;
      for (const fk of foreignKeys) {
        await queryRunner.dropForeignKey("system_configs", fk);
      }
    }

    const reportsTable = await queryRunner.getTable("reports");
    if (reportsTable) {
      const foreignKeys = reportsTable.foreignKeys;
      for (const fk of foreignKeys) {
        await queryRunner.dropForeignKey("reports", fk);
      }
    }

    const notificationsTable = await queryRunner.getTable("notifications");
    if (notificationsTable) {
      const foreignKeys = notificationsTable.foreignKeys;
      for (const fk of foreignKeys) {
        await queryRunner.dropForeignKey("notifications", fk);
      }
    }

    const complaintsTable = await queryRunner.getTable("complaints");
    if (complaintsTable) {
      const foreignKeys = complaintsTable.foreignKeys;
      for (const fk of foreignKeys) {
        await queryRunner.dropForeignKey("complaints", fk);
      }
    }

    const reviewsTable = await queryRunner.getTable("reviews");
    if (reviewsTable) {
      const foreignKeys = reviewsTable.foreignKeys;
      for (const fk of foreignKeys) {
        await queryRunner.dropForeignKey("reviews", fk);
      }
    }

    const shippingsTable = await queryRunner.getTable("shippings");
    if (shippingsTable) {
      const foreignKeys = shippingsTable.foreignKeys;
      for (const fk of foreignKeys) {
        await queryRunner.dropForeignKey("shippings", fk);
      }
    }

    const paymentsTable = await queryRunner.getTable("payments");
    if (paymentsTable) {
      const foreignKeys = paymentsTable.foreignKeys;
      for (const fk of foreignKeys) {
        await queryRunner.dropForeignKey("payments", fk);
      }
    }

    const orderItemsTable = await queryRunner.getTable("order_items");
    if (orderItemsTable) {
      const foreignKeys = orderItemsTable.foreignKeys;
      for (const fk of foreignKeys) {
        await queryRunner.dropForeignKey("order_items", fk);
      }
    }

    const ordersTable = await queryRunner.getTable("orders");
    if (ordersTable) {
      const foreignKeys = ordersTable.foreignKeys;
      for (const fk of foreignKeys) {
        await queryRunner.dropForeignKey("orders", fk);
      }
    }

    const adminsTable = await queryRunner.getTable("admins");
    if (adminsTable) {
      const foreignKeys = adminsTable.foreignKeys;
      for (const fk of foreignKeys) {
        await queryRunner.dropForeignKey("admins", fk);
      }
    }

    // Xóa cột managedByAdminId từ products (nếu có)
    const productsTable = await queryRunner.getTable("products");
    const managedByColumn = productsTable?.findColumnByName("managedByAdminId");
    if (managedByColumn && productsTable) {
      const fk = productsTable.foreignKeys.find(
        (fk) => fk.columnNames.indexOf("managedByAdminId") !== -1
      );
      if (fk) {
        await queryRunner.dropForeignKey("products", fk);
      }
      await queryRunner.dropColumn("products", "managedByAdminId");
    }

    // Xóa bảng
    await queryRunner.dropTable("system_configs");
    await queryRunner.dropTable("reports");
    await queryRunner.dropTable("notifications");
    await queryRunner.dropTable("complaints");
    await queryRunner.dropTable("reviews");
    await queryRunner.dropTable("shippings");
    await queryRunner.dropTable("payments");
    await queryRunner.dropTable("order_items");
    await queryRunner.dropTable("orders");
    await queryRunner.dropTable("vouchers");
    await queryRunner.dropTable("admins");
  }
}

