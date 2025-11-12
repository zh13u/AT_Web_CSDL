import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

// ============================================
// MIGRATION: Create Initial Tables
// ============================================
// Migration này tạo các bảng cơ bản:
// - categories
// - users
// - products
// - carts
// - cart_items

export class CreateInitialTables1700000000000 implements MigrationInterface {
  // ========== UP: Tạo bảng ==========
  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1. Tạo bảng categories
    await queryRunner.createTable(
      new Table({
        name: "categories",
        columns: [
          {
            name: "categoryId",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "categoryName",
            type: "varchar",
            length: "255",
            isUnique: true,
          },
          {
            name: "description",
            type: "text",
            isNullable: true,
          },
        ],
      }),
      true // Nếu bảng đã tồn tại thì skip
    );

    // 2. Tạo bảng users
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "userId",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "name",
            type: "varchar",
            length: "255",
          },
          {
            name: "email",
            type: "varchar",
            length: "255",
            isUnique: true,
          },
          {
            name: "password",
            type: "varchar",
            length: "255",
          },
          {
            name: "phone",
            type: "varchar",
            length: "20",
            isNullable: true,
          },
          {
            name: "address",
            type: "text",
            isNullable: true,
          },
          {
            name: "role",
            type: "enum",
            enum: ["customer", "admin"],
            default: "'customer'",
          },
          {
            name: "dateRegistered",
            type: "datetime",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "lastLogin",
            type: "datetime",
            isNullable: true,
          },
        ],
      }),
      true
    );

    // 3. Tạo bảng products
    await queryRunner.createTable(
      new Table({
        name: "products",
        columns: [
          {
            name: "productId",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "name",
            type: "varchar",
            length: "255",
          },
          {
            name: "description",
            type: "text",
            isNullable: true,
          },
          {
            name: "price",
            type: "decimal",
            precision: 10,
            scale: 2,
          },
          {
            name: "stock",
            type: "int",
            default: 0,
          },
          {
            name: "categoryId",
            type: "int",
          },
          {
            name: "brand",
            type: "varchar",
            length: "100",
          },
          {
            name: "imageUrl",
            type: "varchar",
            length: "500",
            isNullable: true,
          },
          {
            name: "rating",
            type: "decimal",
            precision: 3,
            scale: 2,
            default: 0,
          },
          {
            name: "dateAdded",
            type: "datetime",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "isActive",
            type: "boolean",
            default: true,
          },
        ],
      }),
      true
    );

    // 4. Tạo Foreign Key: products.categoryId → categories.categoryId
    await queryRunner.createForeignKey(
      "products",
      new TableForeignKey({
        columnNames: ["categoryId"],
        referencedColumnNames: ["categoryId"],
        referencedTableName: "categories",
        onDelete: "RESTRICT", // Không cho xóa category nếu còn products
      })
    );

    // 5. Tạo bảng carts
    await queryRunner.createTable(
      new Table({
        name: "carts",
        columns: [
          {
            name: "cartId",
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
            name: "totalPrice",
            type: "decimal",
            precision: 10,
            scale: 2,
            default: 0,
          },
          {
            name: "lastUpdated",
            type: "datetime",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP", // Tự động cập nhật khi có thay đổi
          },
        ],
      }),
      true
    );

    // 6. Tạo Foreign Key: carts.userId → users.userId
    await queryRunner.createForeignKey(
      "carts",
      new TableForeignKey({
        columnNames: ["userId"],
        referencedColumnNames: ["userId"],
        referencedTableName: "users",
        onDelete: "CASCADE", // Xóa cart khi xóa user
      })
    );

    // 7. Tạo bảng cart_items
    await queryRunner.createTable(
      new Table({
        name: "cart_items",
        columns: [
          {
            name: "cartItemId",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "cartId",
            type: "int",
          },
          {
            name: "productId",
            type: "int",
          },
          {
            name: "quantity",
            type: "int",
            default: 1,
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

    // 8. Tạo Foreign Key: cart_items.cartId → carts.cartId
    await queryRunner.createForeignKey(
      "cart_items",
      new TableForeignKey({
        columnNames: ["cartId"],
        referencedColumnNames: ["cartId"],
        referencedTableName: "carts",
        onDelete: "CASCADE", // Xóa cart_items khi xóa cart
      })
    );

    // 9. Tạo Foreign Key: cart_items.productId → products.productId
    await queryRunner.createForeignKey(
      "cart_items",
      new TableForeignKey({
        columnNames: ["productId"],
        referencedColumnNames: ["productId"],
        referencedTableName: "products",
        onDelete: "CASCADE", // Xóa cart_item khi xóa product
      })
    );
  }

  // ========== DOWN: Xóa bảng (rollback) ==========
  public async down(queryRunner: QueryRunner): Promise<void> {
    // Xóa theo thứ tự ngược lại (xóa Foreign Key trước, rồi mới xóa bảng)

    // Xóa Foreign Keys
    const cartItemsTable = await queryRunner.getTable("cart_items");
    if (cartItemsTable) {
      const foreignKeys = cartItemsTable.foreignKeys;
      for (const fk of foreignKeys) {
        await queryRunner.dropForeignKey("cart_items", fk);
      }
    }

    const cartsTable = await queryRunner.getTable("carts");
    if (cartsTable) {
      const foreignKeys = cartsTable.foreignKeys;
      for (const fk of foreignKeys) {
        await queryRunner.dropForeignKey("carts", fk);
      }
    }

    const productsTable = await queryRunner.getTable("products");
    if (productsTable) {
      const foreignKeys = productsTable.foreignKeys;
      for (const fk of foreignKeys) {
        await queryRunner.dropForeignKey("products", fk);
      }
    }

    // Xóa bảng
    await queryRunner.dropTable("cart_items");
    await queryRunner.dropTable("carts");
    await queryRunner.dropTable("products");
    await queryRunner.dropTable("users");
    await queryRunner.dropTable("categories");
  }
}

