import { Injectable, Scope } from '@nestjs/common';
import { CreateAnimalDto } from './dto/animal.dto';
import { Response } from 'express';
import generalResponse from 'src/helper/genrelResponse.helper';
import { AnimalRepository } from './animal.repository';
import { UpdateAnimalDto } from './dto/animalUpdate.dto';

@Injectable({ scope: Scope.REQUEST })
export class AnimalService {
  constructor(private animalRepository: AnimalRepository) {}

  async getAllAnimals() {
    return this.animalRepository.find({
      relations: ['breed', 'animalType', 'animalDescription'],
      select: {
        age: true,
        weight: true,
        rate: true,
        colour: true,
        cage_size: true,
        animalType: {
          name: true,
        },
        breed: {
          name: true,
          medication: {
            allergie: true,
            veterinarian: true,
            vaccination_date: true,
          },
        },
        animalDescription: {
          food_preference: true,
          special_day: true,
        },
      },
    });
  }

  async createAnimal(
    animal: CreateAnimalDto,
    breed,
    animalType,
    animalDescription,
    res: Response,
  ) {
    try {
      const data = await this.animalRepository.save(animal);
      const newAnimal = {
        id: data.id,
        Age: data.age,
        Weight: data.weight,
        rate: data.rate,
        Colour: data.colour,
        'Cage size': data.cage_size,
      };

      breed.animal = [...breed.animal, newAnimal];
      await breed.save();

      animalType.animal = [...animalType.animal, newAnimal];
      await animalType.save();

      animalDescription.animal = newAnimal;
      await animalDescription.save();

      return generalResponse(
        res,
        newAnimal,
        'Animal created successfully',
        'success',
        true,
        201,
      );
    } catch (error) {
      console.log(error);
      return generalResponse(
        res,
        error,
        'Something went wrong in Creating Animal',
        'error',
        true,
        500,
      );
    }
  }

  async updateAnimal(
    id: number,
    updateAnimalDto: UpdateAnimalDto,
    res: Response,
  ) {
    try {
      const animal = await this.findAnimalId(id);
      if (!animal) {
        return generalResponse(
          res,
          '',
          'No Animal Found',
          'success',
          true,
          201,
        );
      }

      Object.assign(animal, updateAnimalDto);

      const data = await this.animalRepository.save(animal);
      const updatedAnimal = {
        Age: data.age,
        Weight: data.weight,
        rate: data.rate,
        Colour: data.colour,
        'Cage size': data.cage_size,
      };

      return generalResponse(
        res,
        updatedAnimal,
        'Animal updated successfully',
        'success',
        true,
        201,
      );
    } catch (error) {
      return generalResponse(
        res,
        error,
        'Something went wrong in Update Animal',
        'error',
        true,
        500,
      );
    }
  }

  async deleteAnimal(animal, res: Response) {
    try {
      const animalId = animal.id;
      const animalData = await this.findAnimalId(animalId);
      if (animalData) {
        await this.animalRepository.softDelete({
          id: animalId,
        });

        return generalResponse(
          res,
          '',
          'Animal deleted successfully',
          'success',
          true,
          201,
        );
      } else {
        return generalResponse(
          res,
          '',
          'No Animal Found',
          'success',
          true,
          201,
        );
      }
    } catch (error) {
      console.log(error);
      return generalResponse(
        res,
        error,
        'Something went wrong in Deleting Animal',
        'error',
        true,
        500,
      );
    }
  }

  async findAnimalId(id: number) {
    const data = await this.animalRepository.findOne({
      where: { id: +id },
    });
    return data;
  }
}
