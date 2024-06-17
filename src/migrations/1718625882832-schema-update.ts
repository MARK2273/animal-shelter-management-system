import { MigrationInterface, QueryRunner } from 'typeorm';

export class SchemaUpdate1718625882832 implements MigrationInterface {
  name = 'SchemaUpdate1718625882832';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`medications\` (\`id\` int NOT NULL AUTO_INCREMENT, \`allergie\` varchar(255) NOT NULL, \`veterinarian\` varchar(255) NOT NULL, \`vaccination_date\` date NOT NULL, \`breedId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`medications\` ADD CONSTRAINT \`FK_9f6d2339dd4f31eb2c8e21cfe56\` FOREIGN KEY (\`breedId\`) REFERENCES \`breeds\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`medications\` DROP FOREIGN KEY \`FK_9f6d2339dd4f31eb2c8e21cfe56\``,
    );
    await queryRunner.query(`DROP TABLE \`medications\``);
  }
}
