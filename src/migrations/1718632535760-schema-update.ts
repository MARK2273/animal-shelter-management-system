import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1718632535760 implements MigrationInterface {
    name = 'SchemaUpdate1718632535760'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`shelters\` DROP COLUMN \`is_deleted\``);
        await queryRunner.query(`ALTER TABLE \`customers\` DROP COLUMN \`is_deleted\``);
        await queryRunner.query(`ALTER TABLE \`breeds\` DROP COLUMN \`is_deleted\``);
        await queryRunner.query(`ALTER TABLE \`medications\` DROP COLUMN \`is_deleted\``);
        await queryRunner.query(`ALTER TABLE \`animal_types\` DROP COLUMN \`is_deleted\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`animal_types\` ADD \`is_deleted\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`medications\` ADD \`is_deleted\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`breeds\` ADD \`is_deleted\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`customers\` ADD \`is_deleted\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`shelters\` ADD \`is_deleted\` tinyint NOT NULL DEFAULT '0'`);
    }

}
