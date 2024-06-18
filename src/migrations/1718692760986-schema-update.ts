import { MigrationInterface, QueryRunner } from 'typeorm';

export class SchemaUpdate1718692760986 implements MigrationInterface {
  name = 'SchemaUpdate1718692760986';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`animals\` (\`id\` int NOT NULL AUTO_INCREMENT, \`weight\` int NOT NULL, \`age\` int NOT NULL, \`rate\` int NOT NULL, \`colour\` varchar(255) NOT NULL, \`gender\` varchar(255) NOT NULL, \`cage_size\` varchar(255) NOT NULL, \`special_day\` date NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`animalTypeId\` int NULL, \`breedId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`animal_description\` (\`id\` int NOT NULL AUTO_INCREMENT, \`food_preference\` varchar(255) NOT NULL, \`special_day\` date NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`animals\` ADD CONSTRAINT \`FK_4bcd2ca9f5ec729a167dd6d9481\` FOREIGN KEY (\`animalTypeId\`) REFERENCES \`animal_types\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`animals\` ADD CONSTRAINT \`FK_41749c5d975b6fdf9dcc56861e2\` FOREIGN KEY (\`breedId\`) REFERENCES \`breeds\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`animals\` DROP FOREIGN KEY \`FK_41749c5d975b6fdf9dcc56861e2\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`animals\` DROP FOREIGN KEY \`FK_4bcd2ca9f5ec729a167dd6d9481\``,
    );
    await queryRunner.query(`DROP TABLE \`animal_description\``);
    await queryRunner.query(`DROP TABLE \`animals\``);
  }
}
