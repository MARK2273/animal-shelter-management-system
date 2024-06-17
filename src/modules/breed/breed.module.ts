import { Module } from '@nestjs/common';
import { BreedController } from './breed.controller';
import { BreedService } from './breed.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BreedRepository } from './breed.repository';
import { MedicationRepository } from '../medication/medication.repository';
import { MedicationService } from '../medication/medication.service';

@Module({
  controllers: [BreedController],
  providers: [
    BreedRepository,
    BreedService,
    MedicationRepository,
    MedicationService,
  ],
  imports: [TypeOrmModule.forFeature([BreedRepository, MedicationRepository])],
})
export class BreedModule {}
