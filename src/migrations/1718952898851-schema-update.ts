import { MigrationInterface, QueryRunner } from 'typeorm';

export class SchemaUpdate1718952898851 implements MigrationInterface {
  name = 'SchemaUpdate1718952898851';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`donations\` DROP FOREIGN KEY \`FK_3f9e3d7a458e0ebe5b22ec37c00\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`donations\` CHANGE \`animalId\` \`to_donation_id\` int NULL`,
    );
    // await queryRunner.query(
    //   `ALTER TABLE \`donations\` ADD CONSTRAINT \`FK_5fbb442086dab0f1fe84b721a0e\` FOREIGN KEY (\`to_donation_id\`) REFERENCES \`animals\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    // );
    // await queryRunner.query(
    //   `ALTER TABLE \`donations\` ADD CONSTRAINT \`FK_5fbb442086dab0f1fe84b721a0e\` FOREIGN KEY (\`to_donation_id\`) REFERENCES \`pet_accessories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    // );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.query(
    //   `ALTER TABLE \`donations\` DROP FOREIGN KEY \`FK_5fbb442086dab0f1fe84b721a0e\``,
    // );
    // await queryRunner.query(
    //   `ALTER TABLE \`donations\` DROP FOREIGN KEY \`FK_5fbb442086dab0f1fe84b721a0e\``,
    // );
    await queryRunner.query(
      `ALTER TABLE \`donations\` CHANGE \`to_donation_id\` \`animalId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`donations\` ADD CONSTRAINT \`FK_3f9e3d7a458e0ebe5b22ec37c00\` FOREIGN KEY (\`animalId\`) REFERENCES \`animals\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
