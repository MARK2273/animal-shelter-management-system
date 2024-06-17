import { Injectable, Scope } from '@nestjs/common';
import { BreedRepository } from './breed.repository';
import { BreedDto, BreedWithMedicationDto } from './dto/breed.dto';
import { Response } from 'express';
import generalResponse from 'src/helper/genrelResponse.helper';
import { Breed } from './breed.entity';

@Injectable({ scope: Scope.REQUEST })
export class BreedService {
  constructor(private breedRepository: BreedRepository) {}

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
    breed: BreedWithMedicationDto,
    res: Response,
  ) {
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
      // const data = await this.breedRepository.save({
      //   name: breed.name,
      //   medication: {},
      // });
      // const createdBreed = {
      //   id: data.id,
      //   Name: data.name,
      // };
      return generalResponse(
        res,
        'data',
        'Breed created successfully',
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
