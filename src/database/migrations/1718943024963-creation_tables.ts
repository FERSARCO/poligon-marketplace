import { MigrationInterface, QueryRunner } from "typeorm";

export class CreationTables1718943024963 implements MigrationInterface {
    name = 'CreationTables1718943024963'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "price" integer NOT NULL, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cart" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_c524ec48751b9b5bcfbf6e59be7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category_products_product" ("categoryId" uuid NOT NULL, "productId" uuid NOT NULL, CONSTRAINT "PK_0b4e34a45516284987c6dbe91cd" PRIMARY KEY ("categoryId", "productId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_90d521137ff8c3e927187bcd27" ON "category_products_product" ("categoryId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ee240b247f9f23e5d35854c186" ON "category_products_product" ("productId") `);
        await queryRunner.query(`CREATE TABLE "product_categories_category" ("productId" uuid NOT NULL, "categoryId" uuid NOT NULL, CONSTRAINT "PK_17f2a361443184000ee8d79f240" PRIMARY KEY ("productId", "categoryId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_342d06dd0583aafc156e076379" ON "product_categories_category" ("productId") `);
        await queryRunner.query(`CREATE INDEX "IDX_15520e638eb4c46c4fb2c61c4b" ON "product_categories_category" ("categoryId") `);
        await queryRunner.query(`CREATE TABLE "product_carts_cart" ("productId" uuid NOT NULL, "cartId" uuid NOT NULL, CONSTRAINT "PK_abb43046ec637b6796127a2ef7a" PRIMARY KEY ("productId", "cartId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_88753cc6cc70ce2161d2082852" ON "product_carts_cart" ("productId") `);
        await queryRunner.query(`CREATE INDEX "IDX_45ef52d15d80ae756b3b8eafba" ON "product_carts_cart" ("cartId") `);
        await queryRunner.query(`CREATE TABLE "cart_products_product" ("cartId" uuid NOT NULL, "productId" uuid NOT NULL, CONSTRAINT "PK_785ab9c1dbede19ef42bf12280b" PRIMARY KEY ("cartId", "productId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e6ce39be5d354954a88ded1eba" ON "cart_products_product" ("cartId") `);
        await queryRunner.query(`CREATE INDEX "IDX_0fc996e42b6330c97f8cffbddf" ON "cart_products_product" ("productId") `);
        await queryRunner.query(`ALTER TABLE "category_products_product" ADD CONSTRAINT "FK_90d521137ff8c3e927187bcd27d" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "category_products_product" ADD CONSTRAINT "FK_ee240b247f9f23e5d35854c186b" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_categories_category" ADD CONSTRAINT "FK_342d06dd0583aafc156e0763790" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "product_categories_category" ADD CONSTRAINT "FK_15520e638eb4c46c4fb2c61c4b4" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_carts_cart" ADD CONSTRAINT "FK_88753cc6cc70ce2161d2082852f" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "product_carts_cart" ADD CONSTRAINT "FK_45ef52d15d80ae756b3b8eafbaf" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart_products_product" ADD CONSTRAINT "FK_e6ce39be5d354954a88ded1ebac" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "cart_products_product" ADD CONSTRAINT "FK_0fc996e42b6330c97f8cffbddfa" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_products_product" DROP CONSTRAINT "FK_0fc996e42b6330c97f8cffbddfa"`);
        await queryRunner.query(`ALTER TABLE "cart_products_product" DROP CONSTRAINT "FK_e6ce39be5d354954a88ded1ebac"`);
        await queryRunner.query(`ALTER TABLE "product_carts_cart" DROP CONSTRAINT "FK_45ef52d15d80ae756b3b8eafbaf"`);
        await queryRunner.query(`ALTER TABLE "product_carts_cart" DROP CONSTRAINT "FK_88753cc6cc70ce2161d2082852f"`);
        await queryRunner.query(`ALTER TABLE "product_categories_category" DROP CONSTRAINT "FK_15520e638eb4c46c4fb2c61c4b4"`);
        await queryRunner.query(`ALTER TABLE "product_categories_category" DROP CONSTRAINT "FK_342d06dd0583aafc156e0763790"`);
        await queryRunner.query(`ALTER TABLE "category_products_product" DROP CONSTRAINT "FK_ee240b247f9f23e5d35854c186b"`);
        await queryRunner.query(`ALTER TABLE "category_products_product" DROP CONSTRAINT "FK_90d521137ff8c3e927187bcd27d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0fc996e42b6330c97f8cffbddf"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e6ce39be5d354954a88ded1eba"`);
        await queryRunner.query(`DROP TABLE "cart_products_product"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_45ef52d15d80ae756b3b8eafba"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_88753cc6cc70ce2161d2082852"`);
        await queryRunner.query(`DROP TABLE "product_carts_cart"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_15520e638eb4c46c4fb2c61c4b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_342d06dd0583aafc156e076379"`);
        await queryRunner.query(`DROP TABLE "product_categories_category"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ee240b247f9f23e5d35854c186"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_90d521137ff8c3e927187bcd27"`);
        await queryRunner.query(`DROP TABLE "category_products_product"`);
        await queryRunner.query(`DROP TABLE "cart"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "category"`);
    }

}
