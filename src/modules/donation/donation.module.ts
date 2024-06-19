import { Module } from '@nestjs/common';
import { DonationController } from './donation.controller';
import { DonationService } from './donation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DonationRepository } from './donation.repository';
import { AnimalRepository } from '../animal/animal.repository';
import { AnimalService } from '../animal/animal.service';

@Module({
  controllers: [DonationController],
  providers: [
    DonationRepository,
    DonationService,
    AnimalRepository,
    AnimalService,
  ],
  imports: [TypeOrmModule.forFeature([DonationRepository, AnimalRepository])],
})
export class DonationModule {}
