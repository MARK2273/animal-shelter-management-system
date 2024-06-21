import { Injectable } from '@nestjs/common';
import { PetAccessoriesRepository } from './petAccessories.repository';
import { PetAccessoriesDto } from './dto/petAccessories.dto';
import { Response } from 'express';
import generalResponse from 'src/helper/genrelResponse.helper';
import { EntityManager } from 'typeorm';
import { PetAccessories } from './petAccessory.entity';
import { ShelterRepository } from '../shelter/shelter.repository';
import { Shelter } from '../shelter/shelter.entity';
import { UpdatePetAccessoriesDto } from './dto/UpdatePetAccessories.dto';

@Injectable()
export class PetAccessoriesService {
  constructor(
    private petAccessoriesRepository: PetAccessoriesRepository,
    private shelterRepository: ShelterRepository,
    private entityManager: EntityManager,
  ) {}

  async getPetAccessoriesByShelterId(
    shelterId: number,
    res: Response,
  ): Promise<void> {
    const petAccessories: PetAccessories[] =
      await this.petAccessoriesRepository.find({
        where: { shelter: { id: shelterId } },
        select: {
          name: true,
          quantity: true,
          price: true,
          shelter: {
            name: true,
            email: true,
            address: true,
          },
        },
        relations: ['shelter'],
      });

    if (petAccessories.length > 0) {
      return generalResponse(
        res,
        petAccessories,
        'All Pet Accessories',
        'error',
        true,
        400,
      );
    } else {
      return generalResponse(
        res,
        [],
        'No Pet Accessories found',
        'error',
        true,
        400,
      );
    }
  }

  async createPetAccessories(
    petAccessories: PetAccessoriesDto,
    res: Response,
  ): Promise<void> {
    try {
      const validShelter: Shelter = await this.shelterRepository.findOne({
        where: { id: petAccessories.shelterId },
      });
      if (!validShelter) {
        return generalResponse(
          res,
          [],
          'Shelter Not exists',
          'error',
          true,
          400,
        );
      } else {
        const validPetAccessories: Promise<PetAccessories> =
          this.validPetAccessories(
            petAccessories.name,
            petAccessories.shelterId,
          );
        if (!validPetAccessories) {
          const newPetAccessories: PetAccessories =
            this.petAccessoriesRepository.create(petAccessories);
          newPetAccessories.shelter = validShelter;
          await this.petAccessoriesRepository.save(newPetAccessories);

          const createdPetAccessories = {
            Name: newPetAccessories.name,
            Quantity: newPetAccessories.quantity,
            Price: newPetAccessories.price,
          };
          return generalResponse(
            res,
            createdPetAccessories,
            'Pet Accessories created successfully',
            'success',
            true,
            201,
          );
        } else {
          return generalResponse(
            res,
            '',
            'Pet Accessories alredy Exists Here',
            'success',
            true,
            201,
          );
        }
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

  async updatePetAccessories(
    id: number,
    updatePetAccessoriesDto: UpdatePetAccessoriesDto,
    res: Response,
  ): Promise<void> {
    try {
      const petAccessories: PetAccessories =
        await this.validPetAccessoriesById(id);

      if (!petAccessories) {
        return generalResponse(
          res,
          '',
          'No Pet Accessories Found',
          'success',
          true,
          201,
        );
      }

      const validpetAccessories: PetAccessories =
        await this.validPetAccessories(
          updatePetAccessoriesDto.name,
          petAccessories.shelter.id,
        );
      if (validpetAccessories) {
        return generalResponse(
          res,
          [],
          'Pet Accessories already exists',
          'error',
          true,
          400,
        );
      }

      Object.assign(petAccessories, updatePetAccessoriesDto);

      const data: PetAccessories =
        await this.petAccessoriesRepository.save(petAccessories);

      const updatedData: {
        Name: string;
        Quantity: number;
        Price: number;
      } = {
        Name: data.name,
        Quantity: data.quantity,
        Price: data.price,
      };

      return generalResponse(
        res,
        updatedData,
        'Pet Accessories updated successfully',
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

  async deletePetAccessories(petAccessories, res: Response): Promise<void> {
    try {
      const petAccessoriesId: number = +petAccessories.id;
      const validPetAccessories: PetAccessories =
        await this.validPetAccessoriesById(petAccessoriesId);
      if (validPetAccessories) {
        await this.petAccessoriesRepository.softDelete({
          id: petAccessoriesId,
        });

        return generalResponse(
          res,
          '',
          'Pet Accessories deleted successfully',
          'success',
          true,
          201,
        );
      } else {
        return generalResponse(
          res,
          '',
          'No Pet Accessories Found',
          'success',
          true,
          201,
        );
      }
    } catch (error) {
      return generalResponse(
        res,
        error,
        'Something went wrong in Deleting Pet Accessories',
        'error',
        true,
        500,
      );
    }
  }

  async validPetAccessories(name: string, id: number): Promise<PetAccessories> {
    return await this.petAccessoriesRepository.findOne({
      where: { name, shelter: { id } },
    });
  }

  async validPetAccessoriesById(id: number): Promise<PetAccessories> {
    return await this.petAccessoriesRepository.findOne({
      where: { id },
      relations: ['shelter'],
    });
  }
}
