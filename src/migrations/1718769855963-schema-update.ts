import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1718769855963 implements MigrationInterface {
    name = 'SchemaUpdate1718769855963'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`animals\` ADD \`shelterId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`animals\` ADD CONSTRAINT \`FK_dd37a43f7990cbef31d9e7c30d7\` FOREIGN KEY (\`shelterId\`) REFERENCES \`shelters\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`animals\` DROP FOREIGN KEY \`FK_dd37a43f7990cbef31d9e7c30d7\``);
        await queryRunner.query(`ALTER TABLE \`animals\` DROP COLUMN \`shelterId\``);
    }

}
