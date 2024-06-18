import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1718711985018 implements MigrationInterface {
    name = 'SchemaUpdate1718711985018'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`shelters\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`address\` varchar(255) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, UNIQUE INDEX \`IDX_7daeabd2875adabfa9c7043c5d\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`staffs\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`position\` enum ('owner', 'worker') NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`contact\` varchar(255) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, UNIQUE INDEX \`IDX_fc7b6dc314d349acb74a6124fe\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`shelters_staff_staffs\` (\`sheltersId\` int NOT NULL, \`staffsId\` int NOT NULL, INDEX \`IDX_04647ff1a0eaf482d311326744\` (\`sheltersId\`), INDEX \`IDX_03b106d402089d876453eee86f\` (\`staffsId\`), PRIMARY KEY (\`sheltersId\`, \`staffsId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`shelters_staff_staffs\` ADD CONSTRAINT \`FK_04647ff1a0eaf482d3113267449\` FOREIGN KEY (\`sheltersId\`) REFERENCES \`shelters\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`shelters_staff_staffs\` ADD CONSTRAINT \`FK_03b106d402089d876453eee86f8\` FOREIGN KEY (\`staffsId\`) REFERENCES \`staffs\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`shelters_staff_staffs\` DROP FOREIGN KEY \`FK_03b106d402089d876453eee86f8\``);
        await queryRunner.query(`ALTER TABLE \`shelters_staff_staffs\` DROP FOREIGN KEY \`FK_04647ff1a0eaf482d3113267449\``);
        await queryRunner.query(`DROP INDEX \`IDX_03b106d402089d876453eee86f\` ON \`shelters_staff_staffs\``);
        await queryRunner.query(`DROP INDEX \`IDX_04647ff1a0eaf482d311326744\` ON \`shelters_staff_staffs\``);
        await queryRunner.query(`DROP TABLE \`shelters_staff_staffs\``);
        await queryRunner.query(`DROP INDEX \`IDX_fc7b6dc314d349acb74a6124fe\` ON \`staffs\``);
        await queryRunner.query(`DROP TABLE \`staffs\``);
        await queryRunner.query(`DROP INDEX \`IDX_7daeabd2875adabfa9c7043c5d\` ON \`shelters\``);
        await queryRunner.query(`DROP TABLE \`shelters\``);
    }

}
