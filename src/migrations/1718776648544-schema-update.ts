import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1718776648544 implements MigrationInterface {
    name = 'SchemaUpdate1718776648544'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`donations\` ADD \`shelterId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`donations\` ADD CONSTRAINT \`FK_ac6e873b55a79a9d00a85643679\` FOREIGN KEY (\`shelterId\`) REFERENCES \`shelters\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`donations\` DROP FOREIGN KEY \`FK_ac6e873b55a79a9d00a85643679\``);
        await queryRunner.query(`ALTER TABLE \`donations\` DROP COLUMN \`shelterId\``);
    }

}
