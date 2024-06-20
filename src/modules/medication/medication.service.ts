import { Injectable } from '@nestjs/common';
import { MedicationRepository } from './medication.repository';
import { MedicationDto } from './dto/medication.dto';
import { Response } from 'express';
import generalResponse from 'src/helper/genrelResponse.helper';
import { BreedRepository } from '../breed/breed.repository';
import { Breed } from '../breed/breed.entity';
import { UpdateMedicationDto } from './dto/medicationUpdate.dto';
import { EntityManager } from 'typeorm';
import { Medication } from './medication.entity';

@Injectable()
export class MedicationService {
  constructor(
    private medicationRepository: MedicationRepository,
    private breedRepository: BreedRepository,
    private entityManager: EntityManager,
  ) {}

  async getMedicationsByBreedId(breedId: number, res: Response): Promise<void> {
    const medication: Medication[] = await this.medicationRepository.find({
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

    if (medication.length > 0) {
      return generalResponse(
        res,
        medication,
        'All Medication',
        'error',
        true,
        400,
      );
    } else {
      return generalResponse(
        res,
        [],
        'No medication found',
        'error',
        true,
        400,
      );
    }
  }

  async getAllMedications(res): Promise<void> {
    const medication: Medication[] = await this.medicationRepository.find({
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

    if (medication.length > 0) {
      return generalResponse(
        res,
        medication,
        'All Medication',
        'error',
        true,
        400,
      );
    } else {
      return generalResponse(
        res,
        [],
        'No medication found',
        'error',
        true,
        400,
      );
    }
  }

  async createMedication(
    medication: MedicationDto,
    breed: Breed,
    res: Response,
  ): Promise<void> {
    try {
      const validAllergie: Medication = await this.findAllergie(
        medication.allergie,
      );
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
        await this.entityManager.transaction(
          async (manager: EntityManager): Promise<void> => {
            const newMedication: {
              allergie: string;
              veterinarian: string;
              vaccination_date: Date;
            } & Medication = await manager.save(Medication, {
              allergie: medication.allergie,
              veterinarian: medication.veterinarian,
              vaccination_date: medication.vaccination_date,
            });

            breed.medication = [...breed.medication, newMedication];
            await manager.save(breed);
            const createdMedication: {
              id: number;
              Allergie: string;
              Veterinarian: string;
              'Vaccination Date': Date;
            } = {
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
          },
        );
      }
    } catch (error) {
      return generalResponse(
        res,
        error,
        'Something went wrong in Creating Medication',
        'error',
        true,
        500,
      );
    }
  }

  async updateMedication(
    id: number,
    updateMedicationDto: UpdateMedicationDto,
    res: Response,
  ): Promise<void> {
    try {
      const medication: Medication = await this.validMedication(id);

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

      const validAllergie: Medication = await this.findAllergie(
        updateMedicationDto.allergie,
      );
      if (validAllergie) {
        return generalResponse(
          res,
          [],
          'Allergie already exists',
          'error',
          true,
          400,
        );
      }

      Object.assign(medication, updateMedicationDto);

      const data: Medication = await this.medicationRepository.save(medication);

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
    } catch (error) {
      return generalResponse(
        res,
        error,
        'Something went wrong in updating Animal Type',
        'error',
        true,
        500,
      );
    }
  }

  async deleteMedication(breed, res: Response): Promise<void> {
    try {
      const breedId: number = +breed.breedId;
      const validMedication: Medication = await this.validMedication(breedId);
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
    } catch (error) {
      return generalResponse(
        res,
        error,
        'Something went wrong in Deleting Medication',
        'error',
        true,
        500,
      );
    }
  }

  async findAllergie(allergie: string): Promise<Medication> {
    const allergies: Medication = await this.medicationRepository.findOne({
      where: { allergie },
      select: {
        id: true,
      },
    });
    return allergies;
  }

  async validMedication(id: number): Promise<Medication> {
    return await this.medicationRepository.findOne({
      where: { id },
    });
  }
}
