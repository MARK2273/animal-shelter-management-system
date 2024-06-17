import { Injectable } from '@nestjs/common';
import { MedicationRepository } from './medication.repository';
import { MedicationDto } from './dto/medication.dto';
import { Response } from 'express';
import generalResponse from 'src/helper/genrelResponse.helper';
import { BreedRepository } from '../breed/breed.repository';
import { Breed } from '../breed/breed.entity';
import { UpdateMedicationDto } from './dto/medicationUpdate.dto';
import { Medication } from './medication.entity';

@Injectable()
export class MedicationService {
  constructor(
    private medicationRepository: MedicationRepository,
    private breedRepository: BreedRepository,
  ) {}

  async getMedicationsByBreedId(breedId: number): Promise<Medication[]> {
    return this.medicationRepository.find({
      where: { breed: { id: breedId } },
      select: {
        allergie: true,
        veterinarian: true,
        vaccination_date: true,
        breed: {
          name: true,
        },
      },
      relations: ['breed'],
    });
  }

  async getAllMedications(): Promise<Medication[]> {
    return this.medicationRepository.find({
      relations: ['breed'],
      select: {
        allergie: true,
        veterinarian: true,
        vaccination_date: true,
        breed: {
          name: true,
        },
      },
    });
  }

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

  async updateMedication(
    id: number,
    updateMedicationDto: UpdateMedicationDto,
    res: Response,
  ) {
    const medication = await this.validMedication(id);

    if (!medication) {
      return generalResponse(
        res,
        '',
        'No Medication Found',
        'success',
        true,
        201,
      );
    }

    Object.assign(medication, updateMedicationDto);

    const data = await this.medicationRepository.save(medication);

    const updatedData = {
      allergie: data.allergie,
      veterinarian: data.veterinarian,
      'Vaccination Date': data.vaccination_date,
    };

    return generalResponse(
      res,
      updatedData,
      'Medication updated successfully',
      'success',
      true,
      201,
    );
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
