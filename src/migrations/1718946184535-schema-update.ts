import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1718946184535 implements MigrationInterface {
    name = 'SchemaUpdate1718946184535'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`pet_accessories\` (\`id\` int NOT NULL AUTO_INCREMENT, \`allergie\` varchar(255) NOT NULL, \`veterinarian\` varchar(255) NOT NULL, \`vaccination_date\` date NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`shelterId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`pet_accessories\` ADD CONSTRAINT \`FK_58a83431bccf26158f9d36f3ed8\` FOREIGN KEY (\`shelterId\`) REFERENCES \`shelters\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`pet_accessories\` DROP FOREIGN KEY \`FK_58a83431bccf26158f9d36f3ed8\``);
        await queryRunner.query(`DROP TABLE \`pet_accessories\``);
    }

}
