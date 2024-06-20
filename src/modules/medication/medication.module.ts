import { Module } from '@nestjs/common';
import { MedicationController } from './medication.controller';
import { MedicationService } from './medication.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicationRepository } from './medication.repository';
import { BreedRepository } from '../breed/breed.repository';
import { BreedService } from '../breed/breed.service';
import { StaffService } from '../staff/staff.service';
import { Medication } from './medication.entity';
import { Breed } from '../breed/breed.entity';
import { Staff } from '../staff/staff.entity';
import { StaffRepository } from '../staff/staff.repository';

@Module({
  controllers: [MedicationController],
  providers: [
    MedicationRepository,
    MedicationService,
    BreedService,
    BreedRepository,
    StaffService,
    StaffRepository,
  ],
  imports: [TypeOrmModule.forFeature([Medication, Breed, Staff])],
})
export class MedicationModule {}
