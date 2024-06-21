import { Module } from '@nestjs/common';
import { BreedController } from './breed.controller';
import { BreedService } from './breed.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BreedRepository } from './breed.repository';
import { MedicationRepository } from '../medication/medication.repository';
import { MedicationService } from '../medication/medication.service';
import { StaffModule } from '../staff/staff.module';
import { StaffService } from '../staff/staff.service';
import { StaffRepository } from '../staff/staff.repository';
import { Staff } from '../staff/staff.entity';
import { Medication } from '../medication/medication.entity';
import { Breed } from './breed.entity';

@Module({
  controllers: [BreedController],
  providers: [
    BreedRepository,
    BreedService,
    MedicationRepository,
    MedicationService,
    StaffService,
    StaffRepository,
  ],
  imports: [TypeOrmModule.forFeature([Breed, Medication, Staff]), StaffModule],
})
export class BreedModule {}
