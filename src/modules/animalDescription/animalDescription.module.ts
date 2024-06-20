import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimalDescriptionController } from './animalDescription.controller';
import { AnimalDescriptionService } from './animalDescription.service';
import { AnimalDescriptionRepository } from './animalDescription.repository';
import { StaffModule } from '../staff/staff.module';
import { StaffService } from '../staff/staff.service';
import { StaffRepository } from '../staff/staff.repository';

@Module({
  controllers: [AnimalDescriptionController],
  providers: [
    AnimalDescriptionRepository,
    AnimalDescriptionService,
    StaffService,
  ],
  imports: [
    TypeOrmModule.forFeature([AnimalDescriptionRepository, StaffRepository]),
    StaffModule,
  ],
})
export class AnimalDescriptionModule {}
