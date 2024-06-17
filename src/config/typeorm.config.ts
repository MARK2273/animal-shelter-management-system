import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'animal_shelter',
  entities: [__dirname + '/../**/*.entity.{ts,js}'],
  synchronize: true,
  migrations: [
    /*...*/
  ],
  autoLoadEntities: true,
  migrationsTableName: 'custom_migration_table',
};
