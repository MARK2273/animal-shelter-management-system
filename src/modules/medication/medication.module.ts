import { Module } from '@nestjs/common';
import { MedicationController } from './medication.controller';
import { MedicationService } from './medication.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicationRepository } from './medication.repository';
import { BreedRepository } from '../breed/breed.repository';
import { BreedService } from '../breed/breed.service';
import { StaffModule } from '../staff/staff.module';
import { StaffService } from '../staff/staff.service';
import { StaffRepository } from '../staff/staff.repository';

@Module({
  controllers: [MedicationController],
  providers: [
    MedicationRepository,
    MedicationService,
    BreedService,
    BreedRepository,
    StaffService,
  ],
  imports: [
    TypeOrmModule.forFeature([
      MedicationRepository,
      BreedRepository,
      StaffRepository,
    ]),
    StaffModule,
  ],
})
export class MedicationModule {}
