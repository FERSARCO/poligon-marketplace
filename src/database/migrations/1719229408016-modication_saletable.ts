import { MigrationInterface, QueryRunner } from "typeorm";

export class ModicationSaletable1719229408016 implements MigrationInterface {
    name = 'ModicationSaletable1719229408016'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sale" ADD "value" numeric NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sale" DROP COLUMN "value"`);
    }

}
