import { Injectable, Scope } from '@nestjs/common';
import { CreateAnimalDto } from './dto/animal.dto';
import { Response } from 'express';
import generalResponse from 'src/helper/genrelResponse.helper';
import { AnimalRepository } from './animal.repository';
import { UpdateAnimalDto } from './dto/animalUpdate.dto';
import { EntityManager } from 'typeorm';
import { Animal } from './animal.entity';

@Injectable({ scope: Scope.REQUEST })
export class AnimalService {
  constructor(
    private animalRepository: AnimalRepository,
    private readonly entityManager: EntityManager,
  ) {}

  async getAllAnimals(): Promise<Animal[]> {
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
    shelter,
    res: Response,
  ) {
    try {
      const data: CreateAnimalDto & Animal =
        await this.animalRepository.save(animal);
      const newAnimal = {
        id: data.id,
        Age: data.age,
        Weight: data.weight,
        rate: data.rate,
        Colour: data.colour,
        'Cage size': data.cage_size,
      };

      await this.entityManager.transaction(
        async (manager: EntityManager): Promise<void> => {
          breed.animal = [...breed.animal, newAnimal];
          await manager.save(breed);

          animalType.animal = [...animalType.animal, newAnimal];
          await manager.save(animalType);

          animalDescription.animal = newAnimal;
          await manager.save(animalDescription);

          shelter.animals = [...shelter.animals, newAnimal];
          await manager.save(shelter);
        },
      );

      return generalResponse(
        res,
        newAnimal,
        'Animal created successfully',
        'success',
        true,
        201,
      );
    } catch (error) {
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
  ): Promise<void> {
    try {
      const animal: Animal = await this.findAnimalId(id);
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

      const data: Animal = await this.animalRepository.save(animal);
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

  async deleteAnimal(animal, res: Response): Promise<void> {
    try {
      const animalId: number = +animal.id;
      const animalData: Animal = await this.findAnimalId(animalId);
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

  async findAnimalId(id: number): Promise<Animal> {
    const data: Animal = await this.animalRepository.findOne({
      where: { id },
      relations: ['donation'],
    });
    return data;
  }
}
