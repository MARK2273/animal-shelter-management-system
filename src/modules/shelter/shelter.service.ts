import { Injectable } from '@nestjs/common';
import { ShelterRepository } from './shelter.repository';
import {
  CreateShelterDto,
  CreateShelterWithStaffDto,
} from './dto/createShelter.dto';
import { Response } from 'express';
import generalResponse from 'src/helper/genrelResponse.helper';
import { StaffRepository } from '../staff/staff.repository';
import { ShelterResponseDto } from './dto/shelterResponse.dto';
import { plainToInstance } from 'class-transformer';
import { UpdateShelterDto } from './dto/shelterUpdate.dto';
import { AnimalRepository } from '../animal/animal.repository';

@Injectable()
export class ShelterService {
  constructor(
    private shelterRepository: ShelterRepository,
    private staffRepository: StaffRepository,
    private animalRepository: AnimalRepository,
  ) {}

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

  async createShelterWithStaff(
    createShelterWithDto: CreateShelterWithStaffDto,
  ): Promise<ShelterResponseDto> {
    const { staff, ...shelterData } = createShelterWithDto;

    const newShelter = this.shelterRepository.create(shelterData);
    await this.shelterRepository.save(newShelter);

    const staffEntities = staff.map((staffDto) => {
      const staffEntity = this.staffRepository.create(staffDto);
      staffEntity.shelter = [newShelter];
      return staffEntity;
    });

    await this.staffRepository.save(staffEntities);

    newShelter.staff = staffEntities;

    return plainToInstance(ShelterResponseDto, newShelter, {
      excludeExtraneousValues: true,
    });
  }

  async updateShelter(
    id: number,
    updateShelterDto: UpdateShelterDto,
    res: Response,
  ) {
    try {
      const shelter = await this.findShelterId(id);
      if (!shelter) {
        return generalResponse(res, '', 'No Shelter Found', 'error', true, 500);
      }

      Object.assign(shelter, updateShelterDto);
      const data = await this.shelterRepository.save(shelter);

      const updatedShelter = {
        name: data.name,
        email: data.email,
        address: data.address,
      };
      return generalResponse(
        res,
        updatedShelter,
        'Shelter updated successfully',
        'success',
        true,
        201,
      );
    } catch (error) {
      return generalResponse(
        res,
        error,
        'Something went wrong in updating Shelter',
        'error',
        true,
        500,
      );
    }
  }

  async deleteShelter(shelterId, res: Response) {
    try {
      const id = shelterId.id;
      const shelter = await this.findShelterId(id);

      if (!shelter) {
        return generalResponse(
          res,
          '',
          'No shelter found',
          'success',
          true,
          400,
        );
      }
      if (shelter.staff && shelter.staff.length > 0) {
        for (const staff of shelter.staff) {
          await this.staffRepository.softDelete(staff.id);
        }
      }

      // Soft delete the animals
      if (shelter.animals && shelter.animals.length > 0) {
        for (const animal of shelter.animals) {
          await this.animalRepository.softDelete(animal.id);
        }
      }

      // Soft delete the shelter
      await this.shelterRepository.softDelete(id);
      return generalResponse(
        res,
        '',
        'Shelter deleted successfully',
        'success',
        true,
        200,
      );
    } catch (error) {
      return generalResponse(
        res,
        error,
        'Something went wrong in deleting Shelter',
        'error',
        true,
        500,
      );
    }
  }

  async findShelterByEmail(email: string) {
    const shelter = await this.shelterRepository.findOne({
      where: { email, deleted_at: null },
      select: {
        id: true,
      },
    });
    return shelter;
  }

  async findShelterId(id: number) {
    const data = await this.shelterRepository.findOne({
      where: { id: +id },
      relations: ['staff', 'animals'],
    });
    return data;
  }
}
