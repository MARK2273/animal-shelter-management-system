import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1718776433412 implements MigrationInterface {
    name = 'SchemaUpdate1718776433412'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`donations\` (\`id\` int NOT NULL AUTO_INCREMENT, \`donation_info\` varchar(255) NOT NULL, \`date\` date NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`animalId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`donations\` ADD CONSTRAINT \`FK_3f9e3d7a458e0ebe5b22ec37c00\` FOREIGN KEY (\`animalId\`) REFERENCES \`animals\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`donations\` DROP FOREIGN KEY \`FK_3f9e3d7a458e0ebe5b22ec37c00\``);
        await queryRunner.query(`DROP TABLE \`donations\``);
    }

}
