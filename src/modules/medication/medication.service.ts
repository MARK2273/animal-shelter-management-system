import { Injectable } from '@nestjs/common';
import { MedicationRepository } from './medication.repository';
import { MedicationDto } from './dto/medication.dto';
import { Response } from 'express';
import generalResponse from 'src/helper/genrelResponse.helper';
import { BreedRepository } from '../breed/breed.repository';
import { Breed } from '../breed/breed.entity';

@Injectable()
export class MedicationService {
  constructor(
    private medicationRepository: MedicationRepository,
    private breedRepository: BreedRepository,
  ) {}

  async createMedication(
    medication: MedicationDto,
    breed: Breed,
    res: Response,
  ) {
    const validAllergie = await this.findAllergie(medication.allergie);
    if (validAllergie) {
      return generalResponse(
        res,
        [],
        'Allergie already exists',
        'error',
        true,
        400,
      );
    } else {
      const newMedication = await this.medicationRepository.save({
        allergie: medication.allergie,
        veterinarian: medication.veterinarian,
        vaccination_date: medication.vaccination_date,
      });

      breed.medication = [...breed.medication, newMedication];
      await breed.save();

      const createdMedication = {
        id: newMedication.id,
        Allergie: newMedication.allergie,
        Veterinarian: newMedication.veterinarian,
        'Vaccination Date': newMedication.vaccination_date,
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

  async deleteMedication(breed, res: Response) {
    const breedId = breed.breedId;
    console.log(breedId);
    const validMedication = await this.validMedication(breedId);
    if (validMedication) {
      await this.medicationRepository.softDelete({ id: breedId });

      return generalResponse(
        res,
        '',
        'Medication deleted successfully',
        'success',
        true,
        201,
      );
    } else {
      return generalResponse(
        res,
        '',
        'No Medication Found',
        'success',
        true,
        201,
      );
    }
  }

  async findAllergie(allergie: string) {
    const allergies = await this.medicationRepository.findOne({
      where: { allergie },
      select: {
        id: true,
      },
    });
    return allergies;
  }

  async validMedication(id: number) {
    return await this.medicationRepository.findOne({
      where: { id },
    });
  }
}
