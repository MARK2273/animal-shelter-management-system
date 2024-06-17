import { Module } from '@nestjs/common';
import { BreedController } from './breed.controller';
import { BreedService } from './breed.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BreedRepository } from './breed.repository';
import { MedicationRepository } from '../medication/medication.repository';

@Module({
  controllers: [BreedController],
  providers: [BreedRepository, BreedService, MedicationRepository],
  imports: [TypeOrmModule.forFeature([BreedRepository])],
})
export class BreedModule {}
