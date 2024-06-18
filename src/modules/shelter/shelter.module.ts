import { Module } from '@nestjs/common';
import { ShelterController } from './shelter.controller';
import { ShelterService } from './shelter.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShelterRepository } from './shelter.repository';
import { StaffRepository } from '../staff/staff.repository';
import { StaffService } from '../staff/staff.service';
import { AnimalRepository } from '../animal/animal.repository';
import { AnimalService } from '../animal/animal.service';
import { Shelter } from './shelter.entity';
import { Staff } from '../staff/staff.entity';
import { Animal } from '../animal/animal.entity';

@Module({
  controllers: [ShelterController],
  providers: [
    ShelterRepository,
    ShelterService,
    StaffRepository,
    StaffService,
    AnimalRepository,
    AnimalService,
  ],
  imports: [TypeOrmModule.forFeature([Shelter, Staff, Animal])],
})
export class ShelterModule {}
