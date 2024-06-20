import { Module } from '@nestjs/common';
import { AnimalTypeController } from './animalType.controller';
import { AnimalTypeService } from './animalType.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimalTypeRepository } from './animalType.repository';
import { StaffModule } from '../staff/staff.module';
import { StaffService } from '../staff/staff.service';
import { StaffRepository } from '../staff/staff.repository';

@Module({
  controllers: [AnimalTypeController],
  providers: [AnimalTypeRepository, AnimalTypeService, StaffService],
  imports: [
    TypeOrmModule.forFeature([AnimalTypeRepository, StaffRepository]),
    StaffModule,
  ],
})
export class AnimalTypeModule {}
