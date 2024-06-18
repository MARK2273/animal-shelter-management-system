import { Module } from '@nestjs/common';
import { StaffController } from './staff.controller';
import { StaffService } from './staff.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffRepository } from './staff.repository';
import { ShelterRepository } from '../shelter/shelter.repository';
import { ShelterService } from '../shelter/shelter.service';

@Module({
  controllers: [StaffController],
  providers: [StaffRepository, StaffService, ShelterRepository, ShelterService],
  imports: [TypeOrmModule.forFeature([StaffRepository, ShelterRepository])],
})
export class StaffModule {}
