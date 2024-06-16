import { Injectable } from '@nestjs/common';
import { MedicationRepository } from './medication.repository';
import { MedicationDto } from './dto/medication.dto';
import { Response } from 'express';
import generalResponse from 'src/helper/genrelResponse.helper';
import { Breed } from '../breed/breed.entity';

@Injectable()
export class MedicationService {
  constructor(private medicationRepository: MedicationRepository) {}

  async createMedication(
    medication: MedicationDto,
    breed: Breed,
    res: Response,
  ) {
    const validAllergie = await this.findAllergie(medication.allergies);
    if (validAllergie) {
      return generalResponse(
        res,
        [],
        'Allergie already Exist.',
        'error',
        true,
        400,
      );
    } else {
      const data = await this.medicationRepository.save({
        allergies: medication.allergies,
        veterinarian: medication.veterinarian,
        vaccination_date: medication.vaccination_date,
      });

      breed.medication = [data, ...breed.medication];
      await breed.save();

      const createdMedication = {
        id: data.id,
        Allergie: data.allergies,
        Veterinarian: data.veterinarian,
        'Vaccination Date': data.vaccination_date,
      };
      return generalResponse(
        res,
        createdMedication,
        'Medication created successfully',
        'success',
        true,
        201,
      );
    }
  }

  async findAllergie(allergies: string) {
    const type = await this.medicationRepository.findOne({
      where: { allergies },
      select: {
        id: true,
      },
    });
    return type;
  }
}
