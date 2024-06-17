import { Injectable, Scope } from '@nestjs/common';
import { BreedRepository } from './breed.repository';
import { BreedDto, BreedWithMedicationDto } from './dto/breed.dto';
import { Response } from 'express';
import generalResponse from 'src/helper/genrelResponse.helper';
import { Breed } from './breed.entity';
import { Medication } from '../medication/medication.entity';
import { MedicationRepository } from '../medication/medication.repository';

@Injectable({ scope: Scope.REQUEST })
export class BreedService {
  constructor(
    private breedRepository: BreedRepository,
    private medicationRepository: MedicationRepository,
  ) {}

  async createBreed(breed: BreedDto, res: Response) {
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
  }

  async createBreedWithMedication(
    breedData: BreedWithMedicationDto,
    res: Response,
  ) {
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
