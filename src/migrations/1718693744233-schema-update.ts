import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1718693744233 implements MigrationInterface {
    name = 'SchemaUpdate1718693744233'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`animal_description\` (\`id\` int NOT NULL AUTO_INCREMENT, \`food_preference\` varchar(255) NOT NULL, \`special_day\` date NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`animal_description\``);
    }

}
