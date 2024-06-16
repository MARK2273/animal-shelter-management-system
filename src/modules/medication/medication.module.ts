import { Module } from '@nestjs/common';
import { MedicationController } from './medication.controller';
import { MedicationService } from './medication.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicationRepository } from './medication.repository';

@Module({
  controllers: [MedicationController],
  providers: [MedicationRepository, MedicationService],
  imports: [TypeOrmModule.forFeature([MedicationRepository])],
})
export class MedicationModule {}
