import { Module } from '@nestjs/common';
import { MedicationController } from './medication.controller';
import { MedicationService } from './medication.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicationRepository } from './medication.repository';
import { BreedRepository } from '../breed/breed.repository';
import { BreedService } from '../breed/breed.service';

@Module({
  controllers: [MedicationController],
  providers: [
    MedicationRepository,
    MedicationService,
    BreedService,
    BreedRepository,
  ],
  imports: [TypeOrmModule.forFeature([MedicationRepository, BreedRepository])],
})
export class MedicationModule {}
