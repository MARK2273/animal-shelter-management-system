import { Injectable, Scope } from '@nestjs/common';
import { BreedRepository } from './breed.repository';
import { BreedDto, BreedWithMedicationDto } from './dto/breed.dto';
import { Response } from 'express';
import generalResponse from 'src/helper/genrelResponse.helper';
import { Breed } from './breed.entity';
import { Medication } from '../medication/medication.entity';
import { MedicationRepository } from '../medication/medication.repository';
import { UpdateBreedDto } from './dto/breedUpdate.dto';
import { EntityManager } from 'typeorm';

@Injectable({ scope: Scope.REQUEST })
export class BreedService {
  constructor(
    private breedRepository: BreedRepository,
    private medicationRepository: MedicationRepository,
    private entityManager: EntityManager,
  ) {}

  async getAllBreeds(): Promise<Breed[]> {
    return this.breedRepository.find({
      relations: ['medication'],
      select: {
        name: true,
        medication: {
          allergie: true,
          veterinarian: true,
          vaccination_date: true,
        },
      },
    });
  }

  async createBreed(breed: BreedDto, res: Response): Promise<void> {
    try {
      const validBreed: Breed = await this.findBreed(breed.name);
      if (validBreed) {
        return generalResponse(
          res,
          [],
          'Breed already exists',
          'error',
          true,
          400,
        );
      } else {
        const data: BreedDto & Breed = await this.breedRepository.save(breed);
        const createdBreed: {
          id: number;
          Name: string;
        } = {
          id: data.id,
          Name: data.name,
        };
        return generalResponse(
          res,
          createdBreed,
          'Breed created successfully',
          'success',
          true,
          201,
        );
      }
    } catch (error) {
      return generalResponse(
        res,
        error,
        'Something went wrong in Creating breed',
        'error',
        true,
        500,
      );
    }
  }

  async createBreedWithMedication(
    breedData: BreedWithMedicationDto,
    res: Response,
  ): Promise<void> {
    try {
      const validBreed: Breed = await this.findBreed(breedData.name);
      if (validBreed) {
        return generalResponse(
          res,
          [],
          'Breed already exists',
          'error',
          true,
          400,
        );
      } else {
        await this.entityManager.transaction(
          async (manager: EntityManager): Promise<void> => {
            const medication = new Medication();
            medication.allergie = breedData.allergie;
            medication.veterinarian = breedData.veterinarian;
            medication.vaccination_date = new Date(breedData.vaccination_date);
            // await this.medicationRepository.save(medication);
            await manager.save(medication);

            const breed = new Breed();
            breed.name = breedData.name;
            breed.medication = [medication];
            // await this.breedRepository.save(breed);
            await manager.save(breed);
          },
        );
        return generalResponse(
          res,
          'data',
          'Breed created successfully with Mediaction',
          'success',
          true,
          201,
        );
      }
    } catch (error) {
      return generalResponse(
        res,
        error,
        'Something went wrong in Creating breed with medication',
        'error',
        true,
        500,
      );
    }
  }

  async updateBreed(
    id: number,
    updateBreedDto: UpdateBreedDto,
    res: Response,
  ): Promise<void> {
    try {
      const breed = await this.findBreedId(id);
      if (!breed) {
        return generalResponse(res, '', 'No Breed Found', 'success', true, 201);
      }

      const validBreed: Breed = await this.findBreed(updateBreedDto.name);
      if (validBreed) {
        return generalResponse(
          res,
          [],
          'Breed already exists',
          'error',
          true,
          400,
        );
      }

      Object.assign(breed, updateBreedDto);

      const data: Breed = await this.breedRepository.save(breed);
      const updatedBreed: {
        name: string;
      } = { name: data.name };

      return generalResponse(
        res,
        updatedBreed,
        'Breed updated successfully',
        'success',
        true,
        201,
      );
    } catch (error) {
      return generalResponse(
        res,
        error,
        'Something went wrong in Update Breed',
        'error',
        true,
        500,
      );
    }
  }

  async deleteBreed(breed, res: Response): Promise<void> {
    try {
      const breedId: number = +breed.breedId;
      const validBreed: Breed = await this.findBreedId(breedId);
      if (validBreed) {
        await this.entityManager.transaction(
          async (manager: EntityManager): Promise<void> => {
            await manager.softDelete(Breed, {
              id: breedId,
            });
            await manager.softDelete(Medication, { breed: { id: breedId } });
          },
        );
        return generalResponse(
          res,
          '',
          'Breed deleted successfully',
          'success',
          true,
          201,
        );
      } else {
        return generalResponse(res, '', 'No Breed Found', 'success', true, 201);
      }
    } catch (error) {
      return generalResponse(
        res,
        error,
        'Something went wrong in Deleting Breed',
        'error',
        true,
        500,
      );
    }
  }

  async findBreed(name: string): Promise<Breed> {
    const breed = await this.breedRepository.findOne({
      where: { name },
      select: {
        id: true,
      },
    });
    return breed;
  }

  async findBreedId(id: number): Promise<Breed> {
    const data: Breed = await this.breedRepository.findOne({
      where: { id: +id },
      relations: ['medication', 'animal'],
    });
    return data;
  }
}
