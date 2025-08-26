import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateProduct1756205377755 implements MigrationInterface {
    name = 'UpdateProduct1756205377755'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "Product_To_Category " (
                "productId" integer NOT NULL,
                "categoryId" integer NOT NULL,
                CONSTRAINT "PK_89e6fea9c3d8b3a67088eda60f2" PRIMARY KEY ("productId", "categoryId")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_a041441b8bd485749c38cdbf1b" ON "Product_To_Category " ("productId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_99617ab82c2fe4e88dd44d3b4b" ON "Product_To_Category " ("categoryId")
        `);
        await queryRunner.query(`
            ALTER TABLE "product" DROP COLUMN "category"
        `);
        await queryRunner.query(`
            ALTER TABLE "product" DROP COLUMN "price"
        `);
        await queryRunner.query(`
            ALTER TABLE "product"
            ADD "price" numeric(6, 2) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "Product_To_Category "
            ADD CONSTRAINT "FK_a041441b8bd485749c38cdbf1b8" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "Product_To_Category "
            ADD CONSTRAINT "FK_99617ab82c2fe4e88dd44d3b4bb" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "Product_To_Category " DROP CONSTRAINT "FK_99617ab82c2fe4e88dd44d3b4bb"
        `);
        await queryRunner.query(`
            ALTER TABLE "Product_To_Category " DROP CONSTRAINT "FK_a041441b8bd485749c38cdbf1b8"
        `);
        await queryRunner.query(`
            ALTER TABLE "product" DROP COLUMN "price"
        `);
        await queryRunner.query(`
            ALTER TABLE "product"
            ADD "price" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "product"
            ADD "category" character varying NOT NULL
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_99617ab82c2fe4e88dd44d3b4b"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_a041441b8bd485749c38cdbf1b"
        `);
        await queryRunner.query(`
            DROP TABLE "Product_To_Category "
        `);
    }

}
