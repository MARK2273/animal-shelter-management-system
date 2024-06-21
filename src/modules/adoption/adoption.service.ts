import { Injectable } from '@nestjs/common';
import { AdoptionRepository } from './adoption.repository';
import { CreateAdoptionDto } from './dto/adoptionCreate.dto';
import { Response } from 'express';
import generalResponse from 'src/helper/genrelResponse.helper';
import { AnimalRepository } from '../animal/animal.repository';
import { Adoption } from './adoption.entity';

@Injectable()
export class AdoptionService {
  constructor(
    private adoptionRepository: AdoptionRepository,
    private animalRepository: AnimalRepository,
  ) {}

  async createAdoption(adoption: CreateAdoptionDto, res: Response) {
    try {
      if (adoption.animal) {
        adoption = { ...adoption, adoption_info: 'animal' };
        await this.animalRepository.softDelete(adoption.animal.id);
      }

      const result: Adoption = this.adoptionRepository.create(adoption);
      const newAdoption: Adoption = await this.adoptionRepository.save(result);

      return generalResponse(
        res,
        newAdoption,
        'Adoption created successfully',
        'success',
        true,
        201,
      );
    } catch (error) {
      return generalResponse(
        res,
        error,
        'Something went wrong in Creating Donation',
        'error',
        true,
        500,
      );
    }
  }

  async getAllAdoption(id: number): Promise<Adoption[]> {
    return this.adoptionRepository.find({
      relations: ['customer', 'shelter', 'animal'],
      where: { shelter: { id } },
      select: {
        adoption_info: true,
        payment_mode: true,
        date: true,
        customer: {
          fname: true,
          lname: true,
          email: true,
          contact: true,
          address: true,
        },
        shelter: {
          name: true,
          email: true,
          address: true,
        },
        animal: {
          weight: true,
          age: true,
          colour: true,
        },
      },
    });
  }
}
