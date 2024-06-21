import { Module } from '@nestjs/common';
import { petAccessoriesController } from './petAccessories.controller';
import { PetAccessoriesService } from './petAccessories.service';
import { PetAccessories } from './petAccessory.entity';
import { PetAccessoriesRepository } from './petAccessories.repository';
import { ShelterRepository } from '../shelter/shelter.repository';
import { StaffRepository } from '../staff/staff.repository';
import { StaffService } from '../staff/staff.service';

@Module({
  controllers: [petAccessoriesController],
  providers: [
    PetAccessoriesRepository,
    PetAccessoriesService,
    ShelterRepository,
    StaffRepository,
    StaffService,
  ],
  imports: [PetAccessories],
})
export class PetAccessoriesModule {}
