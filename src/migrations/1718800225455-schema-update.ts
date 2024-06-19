import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1718800225455 implements MigrationInterface {
    name = 'SchemaUpdate1718800225455'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`adoption\` (\`id\` int NOT NULL AUTO_INCREMENT, \`payment_mode\` varchar(255) NOT NULL, \`adoption_info\` varchar(255) NOT NULL, \`date\` date NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`animalId\` int NULL, \`customerId\` int NULL, \`shelterId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`adoption\` ADD CONSTRAINT \`FK_edc1781b57d704d2153bd89edb3\` FOREIGN KEY (\`animalId\`) REFERENCES \`animals\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`adoption\` ADD CONSTRAINT \`FK_9b286d8719a3c6161b19d3439ba\` FOREIGN KEY (\`customerId\`) REFERENCES \`customers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`adoption\` ADD CONSTRAINT \`FK_8f2377320ac3d953e0adad924e7\` FOREIGN KEY (\`shelterId\`) REFERENCES \`shelters\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`adoption\` DROP FOREIGN KEY \`FK_8f2377320ac3d953e0adad924e7\``);
        await queryRunner.query(`ALTER TABLE \`adoption\` DROP FOREIGN KEY \`FK_9b286d8719a3c6161b19d3439ba\``);
        await queryRunner.query(`ALTER TABLE \`adoption\` DROP FOREIGN KEY \`FK_edc1781b57d704d2153bd89edb3\``);
        await queryRunner.query(`DROP TABLE \`adoption\``);
    }

}
