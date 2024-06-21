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
import { StaffService } from '../staff/staff.service';
import { Animal } from './animal.entity';
import { Breed } from '../breed/breed.entity';
import { Medication } from '../medication/medication.entity';
import { AnimalType } from '../animalType/animalType.entity';
import { AnimalDescription } from '../animalDescription/animalDescription.entity';
import { Shelter } from '../shelter/shelter.entity';
import { Staff } from '../staff/staff.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Animal,
      Breed,
      Medication,
      AnimalType,
      AnimalDescription,
      Shelter,
      Staff,
    ]),
  ],
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
    StaffRepository,
  ],
  controllers: [AnimalController],
})
export class AnimalModule {}
