import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1718788871540 implements MigrationInterface {
    name = 'SchemaUpdate1718788871540'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`donations\` (\`id\` int NOT NULL AUTO_INCREMENT, \`donation_info\` varchar(255) NOT NULL, \`date\` date NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`animalId\` int NULL, \`customerId\` int NULL, \`shelterId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`donations\` ADD CONSTRAINT \`FK_3f9e3d7a458e0ebe5b22ec37c00\` FOREIGN KEY (\`animalId\`) REFERENCES \`animals\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`donations\` ADD CONSTRAINT \`FK_13c229ea8dc52b8f64eb88cf147\` FOREIGN KEY (\`customerId\`) REFERENCES \`customers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`donations\` ADD CONSTRAINT \`FK_ac6e873b55a79a9d00a85643679\` FOREIGN KEY (\`shelterId\`) REFERENCES \`shelters\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`donations\` DROP FOREIGN KEY \`FK_ac6e873b55a79a9d00a85643679\``);
        await queryRunner.query(`ALTER TABLE \`donations\` DROP FOREIGN KEY \`FK_13c229ea8dc52b8f64eb88cf147\``);
        await queryRunner.query(`ALTER TABLE \`donations\` DROP FOREIGN KEY \`FK_3f9e3d7a458e0ebe5b22ec37c00\``);
        await queryRunner.query(`DROP TABLE \`donations\``);
    }

}
