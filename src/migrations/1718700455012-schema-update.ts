import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1718700455012 implements MigrationInterface {
    name = 'SchemaUpdate1718700455012'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_d8a77e9026f3879dcf3b803d7f\` ON \`animals\``);
        await queryRunner.query(`ALTER TABLE \`animals\` DROP COLUMN \`special_day\``);
        await queryRunner.query(`ALTER TABLE \`animals\` DROP COLUMN \`gender\``);
        await queryRunner.query(`ALTER TABLE \`animals\` ADD \`gender\` enum ('male', 'female') NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`animals\` DROP COLUMN \`gender\``);
        await queryRunner.query(`ALTER TABLE \`animals\` ADD \`gender\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`animals\` ADD \`special_day\` date NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_d8a77e9026f3879dcf3b803d7f\` ON \`animals\` (\`animalDescriptionId\`)`);
    }

}
