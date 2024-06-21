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
import { EntityManager } from 'typeorm';
import { Shelter } from './shelter.entity';
import { Staff } from '../staff/staff.entity';
import { CreateStaffWithShelterDto } from '../staff/dto/createStaff.dto';

@Injectable()
export class ShelterService {
  constructor(
    private shelterRepository: ShelterRepository,
    private staffRepository: StaffRepository,
    private animalRepository: AnimalRepository,
    private entityManager: EntityManager,
  ) {}

  async createShelter(shelter: CreateShelterDto, res: Response): Promise<void> {
    const validShelter: Shelter = await this.findShelterByEmail(shelter.email);
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
      const data: CreateShelterDto & Shelter =
        await this.shelterRepository.save(shelter);
      const createdShelter: {
        id: number;
        'Shelter Name': string;
        Email: string;
        Address: string;
      } = {
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
    res: Response,
  ): Promise<void> {
    const { staff, ...shelterData } = createShelterWithDto;

    const validShelter = await this.shelterRepository.findOne({
      where: { email: createShelterWithDto.email },
    });

    if (validShelter) {
      return generalResponse(
        res,
        '',
        'Email alreday Exsisted',
        'success',
        true,
        201,
      );
    }

    staff.forEach(async (worker: CreateStaffWithShelterDto): Promise<void> => {
      const validWorker: Staff = await this.staffRepository.findOne({
        where: { email: worker.email },
      });
      if (validWorker) {
        return generalResponse(
          res,
          worker.email,
          'Email alreday Exsisted',
          'error',
          true,
          201,
        );
      }
    });

    await this.entityManager.transaction(
      async (manager: EntityManager): Promise<ShelterResponseDto> => {
        const newShelter: Shelter = this.shelterRepository.create(shelterData);
        await manager.save(newShelter);

        const staffEntities: Staff[] = staff.map(
          (staffDto: CreateStaffWithShelterDto): Staff => {
            const staffEntity: Staff = this.staffRepository.create(staffDto);
            staffEntity.shelter = [newShelter];
            return staffEntity;
          },
        );

        await manager.save(staffEntities);
        newShelter.staff = staffEntities;
        return plainToInstance(ShelterResponseDto, newShelter, {
          excludeExtraneousValues: true,
        });
      },
    );
  }

  async updateShelter(
    id: number,
    updateShelterDto: UpdateShelterDto,
    res: Response,
  ): Promise<void> {
    try {
      const shelter: Shelter = await this.findShelterId(id);
      if (!shelter) {
        return generalResponse(res, '', 'No Shelter Found', 'error', true, 500);
      }

      Object.assign(shelter, updateShelterDto);
      const data: Shelter = await this.shelterRepository.save(shelter);

      const updatedShelter: {
        name: string;
        email: string;
        address: string;
      } = {
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

  async deleteShelter(shelterId, res: Response): Promise<void> {
    try {
      const id: number = +shelterId.id;
      const shelter: Shelter = await this.findShelterId(id);

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

      if (shelter.animals && shelter.animals.length > 0) {
        for (const animal of shelter.animals) {
          await this.animalRepository.softDelete(animal.id);
        }
      }

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

  async findShelterByEmail(email: string): Promise<Shelter> {
    const shelter = await this.shelterRepository.findOne({
      where: { email, deleted_at: null },
      select: {
        id: true,
      },
    });
    return shelter;
  }

  async findShelterId(id: number): Promise<Shelter> {
    const data: Shelter = await this.shelterRepository.findOne({
      where: { id: +id },
      relations: ['staff', 'animals', 'donation'],
    });
    return data;
  }
}
