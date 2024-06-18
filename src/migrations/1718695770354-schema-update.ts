import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1718695770354 implements MigrationInterface {
    name = 'SchemaUpdate1718695770354'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`animal_description\` (\`id\` int NOT NULL AUTO_INCREMENT, \`food_preference\` varchar(255) NOT NULL, \`special_day\` date NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`animalId\` int NULL, UNIQUE INDEX \`REL_146067a5022a8be6aa80d52188\` (\`animalId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`animal_description\` ADD CONSTRAINT \`FK_146067a5022a8be6aa80d521887\` FOREIGN KEY (\`animalId\`) REFERENCES \`animals\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`animal_description\` DROP FOREIGN KEY \`FK_146067a5022a8be6aa80d521887\``);
        await queryRunner.query(`DROP INDEX \`REL_146067a5022a8be6aa80d52188\` ON \`animal_description\``);
        await queryRunner.query(`DROP TABLE \`animal_description\``);
    }

}
