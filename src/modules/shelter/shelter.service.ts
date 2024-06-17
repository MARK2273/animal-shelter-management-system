import { Injectable } from '@nestjs/common';
import { ShelterRepository } from './shelter.repository';
import { CreateShelterDto } from './dto/createShelter.dto';
import { Response } from 'express';
import generalResponse from 'src/helper/genrelResponse.helper';

@Injectable()
export class ShelterService {
  constructor(private shelterRepository: ShelterRepository) {}

  async createShelter(shelter: CreateShelterDto, res: Response) {
    const validShelter = await this.findShelterByEmail(shelter.email);
    if (validShelter) {
      return generalResponse(
        res,
        [],
        'Shelter already exists on this Email',
        'error',
        true,
        400,
      );
    } else {
      const data = await this.shelterRepository.save(shelter);
      const createdShelter = {
        id: data.id,
        'Shelter Name': data.name,
        Email: data.email,
        Address: data.address,
      };
      return generalResponse(
        res,
        createdShelter,
        'Shelter created successfully',
        'success',
        true,
        201,
      );
    }
  }

  async findShelterByEmail(email: string) {
    const shelter = await this.shelterRepository.findOne({
      where: { email, is_deleted: false },
      select: {
        id: true,
      },
    });
    return shelter;
  }
}
