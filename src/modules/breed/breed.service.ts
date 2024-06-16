import { Injectable } from '@nestjs/common';
import { BreedRepository } from './breed.repository';
import { BreedDto } from './dto/breed.dto';
import { Response } from 'express';
import generalResponse from 'src/helper/genrelResponse.helper';
import { Breed } from './breed.entity';

@Injectable()
export class BreedService {
  constructor(private breedRepository: BreedRepository) {}

  async createBreed(breed: BreedDto, res: Response) {
    // const validAnimalType = await this.findAnimalType(animalType.name);
    // if (validAnimalType) {
    //   return generalResponse(
    //     res,
    //     [],
    //     'Animal Type already Exist.',
    //     'error',
    //     true,
    //     400,
    //   );
    // } else {
    //   const data = await this.animalTypeRepository.save(animalType);
    //   const createdAnimalType = {
    //     id: data.id,
    //     Type: data.name,
    //   };
    //   return generalResponse(
    //     res,
    //     createdAnimalType,
    //     'Animal Type created successfully',
    //     'success',
    //     true,
    //     201,
    //   );
    // }
    console.log('sdjvb');
  }

  // async findAnimalType(name: string) {
  //   const type = await this.animalTypeRepository.findOne({
  //     where: { name },
  //     select: {
  //       id: true,
  //     },
  //   });
  //   return type;
  // }

  async getBreedById(id: number): Promise<Breed> {
    return await this.breedRepository.findOne({
      where: { id },
      relations: ['medication'],
    });
  }
}
