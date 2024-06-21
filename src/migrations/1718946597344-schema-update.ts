import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1718946597344 implements MigrationInterface {
    name = 'SchemaUpdate1718946597344'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`pet_accessories\` DROP COLUMN \`allergie\``);
        await queryRunner.query(`ALTER TABLE \`pet_accessories\` DROP COLUMN \`veterinarian\``);
        await queryRunner.query(`ALTER TABLE \`pet_accessories\` DROP COLUMN \`vaccination_date\``);
        await queryRunner.query(`ALTER TABLE \`pet_accessories\` ADD \`item\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`pet_accessories\` ADD \`quantity\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`pet_accessories\` ADD \`price\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`pet_accessories\` DROP COLUMN \`price\``);
        await queryRunner.query(`ALTER TABLE \`pet_accessories\` DROP COLUMN \`quantity\``);
        await queryRunner.query(`ALTER TABLE \`pet_accessories\` DROP COLUMN \`item\``);
        await queryRunner.query(`ALTER TABLE \`pet_accessories\` ADD \`vaccination_date\` date NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`pet_accessories\` ADD \`veterinarian\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`pet_accessories\` ADD \`allergie\` varchar(255) NOT NULL`);
    }

}
