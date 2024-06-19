import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1718776553244 implements MigrationInterface {
    name = 'SchemaUpdate1718776553244'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`donations\` ADD \`customerId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`donations\` ADD CONSTRAINT \`FK_13c229ea8dc52b8f64eb88cf147\` FOREIGN KEY (\`customerId\`) REFERENCES \`customers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`donations\` DROP FOREIGN KEY \`FK_13c229ea8dc52b8f64eb88cf147\``);
        await queryRunner.query(`ALTER TABLE \`donations\` DROP COLUMN \`customerId\``);
    }

}
