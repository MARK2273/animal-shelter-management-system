import { Module } from '@nestjs/common';
import { AnimalTypeController } from './animalType.controller';
import { AnimalTypeService } from './animalType.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimalTypeRepository } from './animalType.repository';
import { StaffModule } from '../staff/staff.module';
import { StaffService } from '../staff/staff.service';
import { StaffRepository } from '../staff/staff.repository';
import { AnimalType } from './animalType.entity';
import { Staff } from '../staff/staff.entity';

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
