import { Module } from '@nestjs/common';
import { CustomerModule } from './modules/customer/customer.module';
import { ShelterModule } from './modules/shelter/shelter.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimalTypeModule } from './modules/animalType/animalType.module';
import { BreedModule } from './modules/breed/breed.module';
import { MedicationModule } from './modules/medication/medication.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AnimalDescriptionModule } from './modules/animalDescription/animalDescription.module';
import { AnimalModule } from './modules/animal/animal.module';
import { StaffModule } from './modules/staff/staff.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DATABASE_HOST'),
        port: configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_DB'),
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: false,
        autoLoadEntities: true,
        migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
        seeds: [__dirname + '/seeds/**/*{.ts,.js}'],
        factories: [__dirname + '/factories/**/*{.ts,.js}'],
        cli: {
          migrationsDir: __dirname + '/migrations/',
        },
      }),
      inject: [ConfigService],
    }),
    CustomerModule,
    ShelterModule,
    AnimalTypeModule,
    MedicationModule,
    BreedModule,
    AnimalDescriptionModule,
    AnimalModule,
    StaffModule,
  ],
})
export class AppModule {}
