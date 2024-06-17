import { Module } from '@nestjs/common';
import { CustomerModule } from './modules/customer/customer.module';
import { ShelterModule } from './modules/shelter/shelter.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AnimalTypeModule } from './modules/animalType/animalType.module';
import { BreedModule } from './modules/breed/breed.module';
import { MedicationModule } from './modules/medication/medication.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    CustomerModule,
    ShelterModule,
    AnimalTypeModule,
    MedicationModule,
    BreedModule,
  ],
})
export class AppModule {}
