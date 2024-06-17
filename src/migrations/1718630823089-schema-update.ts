import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1718630823089 implements MigrationInterface {
    name = 'SchemaUpdate1718630823089'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`breeds\` ADD \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`breeds\` ADD \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`breeds\` ADD \`deleted_at\` timestamp(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`breeds\` ADD \`is_deleted\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`medications\` ADD \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`medications\` ADD \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`medications\` ADD \`deleted_at\` timestamp(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`medications\` ADD \`is_deleted\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`animal_types\` ADD \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`animal_types\` ADD \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`animal_types\` ADD \`deleted_at\` timestamp(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`animal_types\` ADD \`is_deleted\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`animal_types\` DROP COLUMN \`is_deleted\``);
        await queryRunner.query(`ALTER TABLE \`animal_types\` DROP COLUMN \`deleted_at\``);
        await queryRunner.query(`ALTER TABLE \`animal_types\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`animal_types\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`medications\` DROP COLUMN \`is_deleted\``);
        await queryRunner.query(`ALTER TABLE \`medications\` DROP COLUMN \`deleted_at\``);
        await queryRunner.query(`ALTER TABLE \`medications\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`medications\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`breeds\` DROP COLUMN \`is_deleted\``);
        await queryRunner.query(`ALTER TABLE \`breeds\` DROP COLUMN \`deleted_at\``);
        await queryRunner.query(`ALTER TABLE \`breeds\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`breeds\` DROP COLUMN \`created_at\``);
    }

}
