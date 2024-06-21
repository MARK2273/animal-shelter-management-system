import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1718948221119 implements MigrationInterface {
    name = 'SchemaUpdate1718948221119'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`pet_accessories\` CHANGE \`item\` \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`pet_accessories\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`pet_accessories\` ADD \`name\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`pet_accessories\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`pet_accessories\` ADD \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`pet_accessories\` CHANGE \`name\` \`item\` varchar(255) NOT NULL`);
    }

}
