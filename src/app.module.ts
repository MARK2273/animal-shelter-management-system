import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './modules/customer/customer.module';
import { ShelterModule } from './modules/shelter/shelter.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AnimalTypeModule } from './modules/animalType/animalType.module';
import { MedicationModule } from './modules/medication/medication.module';
import { BreedModule } from './modules/breed/breed.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    CustomerModule,
    ShelterModule,
    AnimalTypeModule,
    MedicationModule,
    BreedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
