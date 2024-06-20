import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimalDescriptionController } from './animalDescription.controller';
import { AnimalDescriptionService } from './animalDescription.service';
import { AnimalDescriptionRepository } from './animalDescription.repository';
import { StaffService } from '../staff/staff.service';
import { AnimalDescription } from './animalDescription.entity';
import { Staff } from '../staff/staff.entity';
import { StaffRepository } from '../staff/staff.repository';

@Module({
  controllers: [AnimalDescriptionController],
  providers: [
    AnimalDescriptionRepository,
    AnimalDescriptionService,
    StaffService,
    StaffRepository,
  ],
  imports: [TypeOrmModule.forFeature([AnimalDescription, Staff])],
})
export class AnimalDescriptionModule {}
