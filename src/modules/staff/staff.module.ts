import { Module } from '@nestjs/common';
import { StaffController } from './staff.controller';
import { StaffService } from './staff.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffRepository } from './staff.repository';
import { ShelterRepository } from '../shelter/shelter.repository';
import { ShelterService } from '../shelter/shelter.service';
import { AnimalRepository } from '../animal/animal.repository';
import { AnimalService } from '../animal/animal.service';
import { Animal } from '../animal/animal.entity';

@Module({
  controllers: [StaffController],
  providers: [
    StaffRepository,
    StaffService,
    ShelterRepository,
    ShelterService,
    AnimalRepository,
    AnimalService,
  ],
  imports: [
    TypeOrmModule.forFeature([
      StaffRepository,
      ShelterRepository,
      AnimalRepository,
    ]),
  ],
})
export class StaffModule {}
