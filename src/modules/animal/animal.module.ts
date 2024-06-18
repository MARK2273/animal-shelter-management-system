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
  ],
  imports: [
    TypeOrmModule.forFeature([
      AnimalRepository,
      BreedRepository,
      MedicationRepository,
      AnimalTypeRepository,
      AnimalDescriptionRepository,
    ]),
  ],
})
export class AnimalModule {}
