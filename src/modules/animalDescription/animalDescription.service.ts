import { Injectable } from '@nestjs/common';
import { AnimalDescriptionRepository } from './animalDescription.repository';
import { CreateAnimalDescriptionDto } from './dto/animalDescription.dto';
import { Response } from 'express';
import generalResponse from 'src/helper/genrelResponse.helper';
import { UpdateAnimalDescriptionDto } from './dto/animalDescriptionUpdate.dto';

@Injectable()
export class AnimalDescriptionService {
  constructor(
    private animalDescriptionRepository: AnimalDescriptionRepository,
  ) {}

  async getAllAnimalDescription() {
    return this.animalDescriptionRepository.find({
      relations: ['animal'],
      select: {
        food_preference: true,
        special_day: true,
        animal: {
          weight: true,
          age: true,
          rate: true,
          colour: true,
          gender: true,
          cage_size: true,
        },
      },
    });
  }

  async createAnimalDescription(
    animalDescription: CreateAnimalDescriptionDto,
    res: Response,
  ) {
    try {
      const data =
        await this.animalDescriptionRepository.save(animalDescription);
      const createdAnimalDescription = {
        id: data.id,
        'Food Preference': data.food_preference,
        'Special Day': data.special_day,
      };
      return generalResponse(
        res,
        createdAnimalDescription,
        'Animal Description created successfully',
        'success',
        true,
        201,
      );
    } catch (error) {
      return generalResponse(
        res,
        error,
        'Something went wrong in Creating Animal Description',
        'error',
        true,
        500,
      );
    }
  }

  async updateAnimalDescription(
    id: number,
    updateAnimalDescriptionDto: UpdateAnimalDescriptionDto,
    res: Response,
  ) {
    try {
      const animalDescription = await this.validAnimalDescription(id);

      if (!animalDescription) {
        return generalResponse(
          res,
          '',
          'No Description Found',
          'success',
          true,
          201,
        );
      }

      Object.assign(animalDescription, updateAnimalDescriptionDto);

      const data =
        await this.animalDescriptionRepository.save(animalDescription);

      const updatedData = {
        'Food Preference': data.food_preference,
        'Special Day': data.special_day,
      };

      return generalResponse(
        res,
        updatedData,
        'Animal description updated successfully',
        'success',
        true,
        201,
      );
    } catch (error) {
      return generalResponse(
        res,
        error,
        'Something went wrong in updating Animal description ',
        'error',
        true,
        500,
      );
    }
  }

  async deleteAnimalDescription(animalDescription, res: Response) {
    try {
      const id = animalDescription.id;
      const AnimalDescription = await this.validAnimalDescription(id);
      if (AnimalDescription) {
        await this.animalDescriptionRepository.softDelete({ id });

        return generalResponse(
          res,
          '',
          'Animal Description deleted successfully',
          'success',
          true,
          201,
        );
      } else {
        return generalResponse(
          res,
          '',
          'No Animal Description Found',
          'success',
          true,
          201,
        );
      }
    } catch (error) {
      return generalResponse(
        res,
        error,
        'Something went wrong in Deleting Animal Description',
        'error',
        true,
        500,
      );
    }
  }

  async validAnimalDescription(id: number) {
    return await this.animalDescriptionRepository.findOne({
      where: { id },
    });
  }
}
