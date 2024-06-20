import { Module } from '@nestjs/common';
import { AnimalController } from './animal.controller';
import { AnimalService } from './animal.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimalRepository } from './animal.repository';
import { BreedService } from '../breed/breed.service';
import { BreedRepository } from '../breed/breed.repository';
import { MedicationRepository } from '../medication/medication.repository';
import { AnimalTypeRepository } from '../animalType/animalType.repository';
import { AnimalTypeService } from '../animalType/animalType.service';
import { AnimalDescriptionRepository } from '../animalDescription/animalDescription.repository';
import { AnimalDescriptionService } from '../animalDescription/animalDescription.service';
import { ShelterRepository } from '../shelter/shelter.repository';
import { ShelterService } from '../shelter/shelter.service';
import { StaffRepository } from '../staff/staff.repository';
import { StaffModule } from '../staff/staff.module';
import { StaffService } from '../staff/staff.service';

@Module({
  controllers: [AnimalController],
  providers: [
    AnimalRepository,
    AnimalService,
    BreedService,
    BreedRepository,
    MedicationRepository,
    AnimalTypeRepository,
    AnimalTypeService,
    AnimalDescriptionRepository,
    AnimalDescriptionService,
    ShelterRepository,
    ShelterService,
    StaffService,
  ],
  imports: [
    TypeOrmModule.forFeature([
      AnimalRepository,
      BreedRepository,
      MedicationRepository,
      AnimalTypeRepository,
      AnimalDescriptionRepository,
      ShelterRepository,
      StaffRepository,
    ]),
    StaffModule,
  ],
})
export class AnimalModule {}
