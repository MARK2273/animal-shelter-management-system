import { Injectable } from '@nestjs/common';
import { AnimalTypeRepository } from './animalType.repository';
import { AnimalTypeDto } from './dto/animalType.dto';
import { Response } from 'express';
import generalResponse from 'src/helper/genrelResponse.helper';
import { AnimalType } from './animalType.entity';

@Injectable()
export class AnimalTypeService {
  constructor(private animalTypeRepository: AnimalTypeRepository) {}

  async createAnimalType(
    animalType: AnimalTypeDto,
    res: Response,
  ): Promise<void> {
    try {
      const validAnimalType: AnimalType = await this.findAnimalType(
        animalType.name,
      );
      if (validAnimalType) {
        return generalResponse(
          res,
          [],
          'Animal Type already Exist.',
          'error',
          true,
          400,
        );
      } else {
        const data: AnimalTypeDto & AnimalType =
          await this.animalTypeRepository.save(animalType);
        const createdAnimalType = {
          id: data.id,
          Type: data.name,
        };
        return generalResponse(
          res,
          createdAnimalType,
          'Animal Type created successfully',
          'success',
          true,
          201,
        );
      }
    } catch (error) {
      return generalResponse(
        res,
        error,
        'Something went wrong in Creating Animal Type',
        'error',
        true,
        500,
      );
    }
  }

  async findAnimalType(name: string): Promise<AnimalType> {
    const type: AnimalType = await this.animalTypeRepository.findOne({
      where: { name },
      select: {
        id: true,
      },
    });
    return type;
  }

  async findAnimalTypeId(id: number): Promise<AnimalType> {
    const type: AnimalType = await this.animalTypeRepository.findOne({
      where: { id },
      relations: ['animal'],
    });
    return type;
  }
}
