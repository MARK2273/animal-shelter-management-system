import { Module } from '@nestjs/common';
import { DonationController } from './donation.controller';
import { DonationService } from './donation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DonationRepository } from './donation.repository';
import { AnimalRepository } from '../animal/animal.repository';
import { AnimalService } from '../animal/animal.service';
import { CustomerService } from '../customer/customer.service';
import { CustomerRepository } from '../customer/customer.repository';
import { ShelterService } from '../shelter/shelter.service';
import { ShelterRepository } from '../shelter/shelter.repository';
import { StaffRepository } from '../staff/staff.repository';
import { StaffService } from '../staff/staff.service';
import { StaffModule } from '../staff/staff.module';
import { Donation } from './donation.entity';
import { Animal } from '../animal/animal.entity';
import { Customer } from '../customer/customer.entity';
import { Shelter } from '../shelter/shelter.entity';
import { Staff } from '../staff/staff.entity';
import { PetAccessoriesService } from '../petAccessories/petAccessories.service';
import { PetAccessoriesRepository } from '../petAccessories/petAccessories.repository';

@Module({
  controllers: [DonationController],
  providers: [
    DonationRepository,
    DonationService,
    AnimalRepository,
    AnimalService,
    CustomerService,
    CustomerRepository,
    ShelterService,
    ShelterRepository,
    StaffRepository,
    StaffService,
    PetAccessoriesRepository,
    PetAccessoriesService,
  ],
  imports: [
    TypeOrmModule.forFeature([Donation, Animal, Customer, Shelter, Staff]),
    StaffModule,
  ],
})
export class DonationModule {}
