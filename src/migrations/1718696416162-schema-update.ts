import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1718696416162 implements MigrationInterface {
    name = 'SchemaUpdate1718696416162'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`animal_description\` DROP FOREIGN KEY \`FK_146067a5022a8be6aa80d521887\``);
        await queryRunner.query(`DROP INDEX \`REL_146067a5022a8be6aa80d52188\` ON \`animal_description\``);
        await queryRunner.query(`ALTER TABLE \`animal_description\` DROP COLUMN \`animalId\``);
        await queryRunner.query(`ALTER TABLE \`animals\` ADD \`animalDescriptionId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`animals\` ADD UNIQUE INDEX \`IDX_d8a77e9026f3879dcf3b803d7f\` (\`animalDescriptionId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_d8a77e9026f3879dcf3b803d7f\` ON \`animals\` (\`animalDescriptionId\`)`);
        await queryRunner.query(`ALTER TABLE \`animals\` ADD CONSTRAINT \`FK_d8a77e9026f3879dcf3b803d7f2\` FOREIGN KEY (\`animalDescriptionId\`) REFERENCES \`animal_description\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`animals\` DROP FOREIGN KEY \`FK_d8a77e9026f3879dcf3b803d7f2\``);
        await queryRunner.query(`DROP INDEX \`REL_d8a77e9026f3879dcf3b803d7f\` ON \`animals\``);
        await queryRunner.query(`ALTER TABLE \`animals\` DROP INDEX \`IDX_d8a77e9026f3879dcf3b803d7f\``);
        await queryRunner.query(`ALTER TABLE \`animals\` DROP COLUMN \`animalDescriptionId\``);
        await queryRunner.query(`ALTER TABLE \`animal_description\` ADD \`animalId\` int NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_146067a5022a8be6aa80d52188\` ON \`animal_description\` (\`animalId\`)`);
        await queryRunner.query(`ALTER TABLE \`animal_description\` ADD CONSTRAINT \`FK_146067a5022a8be6aa80d521887\` FOREIGN KEY (\`animalId\`) REFERENCES \`animals\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
