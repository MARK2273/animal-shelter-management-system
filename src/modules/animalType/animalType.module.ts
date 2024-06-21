import { Module } from '@nestjs/common';
import { AnimalTypeController } from './animalType.controller';
import { AnimalTypeService } from './animalType.service';
import { AnimalTypeRepository } from './animalType.repository';
import { StaffService } from '../staff/staff.service';
import { StaffRepository } from '../staff/staff.repository';

@Module({
  controllers: [AnimalTypeController],
  providers: [
    AnimalTypeRepository,
    AnimalTypeService,
    StaffService,
    StaffRepository,
  ],
  imports: [],
})
export class AnimalTypeModule {}
