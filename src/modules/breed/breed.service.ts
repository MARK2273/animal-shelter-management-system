import { Injectable, Scope } from '@nestjs/common';
import { BreedRepository } from './breed.repository';
import { BreedDto, BreedWithMedicationDto } from './dto/breed.dto';
import { Response } from 'express';
import generalResponse from 'src/helper/genrelResponse.helper';
import { Breed } from './breed.entity';
import { Medication } from '../medication/medication.entity';
import { MedicationRepository } from '../medication/medication.repository';
import { UpdateBreedDto } from './dto/breedUpdate.dto';

@Injectable({ scope: Scope.REQUEST })
export class BreedService {
  constructor(
    private breedRepository: BreedRepository,
    private medicationRepository: MedicationRepository,
  ) {}

  async createBreed(breed: BreedDto, res: Response) {
    try {
      const validBreed = await this.findBreed(breed.name);
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
        const data = await this.breedRepository.save(breed);
        const createdBreed = {
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
  ) {
    try {
      const validBreed = await this.findBreed(breedData.name);
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
        const medication = new Medication();
        medication.allergie = breedData.allergie;
        medication.veterinarian = breedData.veterinarian;
        medication.vaccination_date = new Date(breedData.vaccination_date);
        await this.medicationRepository.save(medication);

        const breed = new Breed();
        breed.name = breedData.name;
        breed.medication = [medication];
        await this.breedRepository.save(breed);

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

  async updateBreed(id: number, updateBreedDto: UpdateBreedDto, res: Response) {
    try {
      const breed = await this.findBreedId(id);
      if (!breed) {
        return generalResponse(res, '', 'No Breed Found', 'success', true, 201);
      }

      Object.assign(breed, updateBreedDto);

      const data = await this.breedRepository.save(breed);
      const updatedBreed = { name: data.name };

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

  async findBreed(name: string) {
    const breed = await this.breedRepository.findOne({
      where: { name },
      select: {
        id: true,
      },
    });
    return breed;
  }

  async findBreedId(id: number): Promise<Breed> {
    const data = await this.breedRepository.findOne({
      where: { id: +id },
      relations: { medication: true },
    });
    return data;
  }
}
