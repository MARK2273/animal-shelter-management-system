import { Module } from '@nestjs/common';
import { adoptionController } from './adoption.controller';
import { AdoptionService } from './adoption.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdoptionRepository } from './adoption.repository';
import { AnimalRepository } from '../animal/animal.repository';
import { AnimalService } from '../animal/animal.service';
import { CustomerService } from '../customer/customer.service';
import { CustomerRepository } from '../customer/customer.repository';
import { ShelterService } from '../shelter/shelter.service';
import { ShelterRepository } from '../shelter/shelter.repository';
import { StaffRepository } from '../staff/staff.repository';
import { StaffService } from '../staff/staff.service';

@Module({
  controllers: [adoptionController],
  providers: [
    AdoptionRepository,
    AdoptionService,
    AnimalRepository,
    AnimalService,
    CustomerService,
    CustomerRepository,
    ShelterService,
    ShelterRepository,
    StaffRepository,
    StaffService,
  ],
  imports: [
    TypeOrmModule.forFeature([
      AdoptionRepository,
      AnimalRepository,
      CustomerRepository,
      ShelterRepository,
      StaffRepository,
    ]),
  ],
})
export class AdoptionModule {}
