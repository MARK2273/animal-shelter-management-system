import { Injectable } from '@nestjs/common';
import { StaffRepository } from './staff.repository';
import { CreateStaffDto } from './dto/createStaff.dto';
import { Response } from 'express';
import generalResponse from 'src/helper/genrelResponse.helper';
import { Shelter } from '../shelter/shelter.entity';
import { UpdateStaffDto } from './dto/staffUpdate.dto';
import { EntityManager } from 'typeorm';

@Injectable()
export class StaffService {
  constructor(
    private staffRepository: StaffRepository,
    private readonly entityManager: EntityManager,
  ) {}

  async getStaffByShelterId(shelterId: number) {
    return this.staffRepository.find({
      where: { shelter: { id: shelterId } },
      select: {
        name: true,
        position: true,
        email: true,
        contact: true,
        shelter: {
          name: true,
          email: true,
          address: true,
        },
      },

      relations: ['shelter'],
    });
  }

  async createStaff(staff: CreateStaffDto, shelter: Shelter, res: Response) {
    try {
      const validStaff = await this.findStaffByEmail(staff.email);

      if (validStaff) {
        return generalResponse(
          res,
          [],
          'Email already exists',
          'error',
          true,
          400,
        );
      }

      const createdStaff = await this.entityManager.transaction(
        async (manager) => {
          const newStaff = this.staffRepository.create(staff);
          await manager.save(newStaff);

          shelter.staff.push(newStaff);
          await manager.save(shelter);

          return {
            id: newStaff.id,
            name: newStaff.name,
            email: newStaff.email,
            contact: newStaff.contact,
          };
        },
      );

      return generalResponse(
        res,
        createdStaff,
        'Staff created successfully',
        'success',
        true,
        201,
      );
    } catch (error) {
      console.error('Error creating staff:', error);
      return generalResponse(
        res,
        error,
        'Something went wrong in Creating Staff',
        'error',
        true,
        500,
      );
    }
  }

  async updateStaff(id: number, updateStaffDto: UpdateStaffDto, res: Response) {
    try {
      const staff = await this.findStaffById(id);
      if (!staff) {
        return generalResponse(res, '', 'No Staff Found', 'success', true, 201);
      }

      const validStaff = await this.findStaffByEmail(updateStaffDto.email);
      if (validStaff) {
        return generalResponse(
          res,
          [],
          'Email already exists',
          'error',
          true,
          400,
        );
      }

      Object.assign(staff, updateStaffDto);

      const data = await this.staffRepository.save(staff);
      const updatedStaff = {
        name: data.name,
        email: data.email,
        contact: data.contact,
        position: data.position,
      };

      return generalResponse(
        res,
        updatedStaff,
        'Staff updated successfully',
        'success',
        true,
        201,
      );
    } catch (error) {
      return generalResponse(
        res,
        error,
        'Something went wrong in Updating Staff',
        'error',
        true,
        500,
      );
    }
  }

  async deleteStaff(staff, res: Response) {
    try {
      const staffId = staff.id;
      const validStaff = await this.findStaffById(staffId);
      if (validStaff) {
        await this.staffRepository.softDelete({ id: staffId });

        return generalResponse(
          res,
          '',
          'Staff deleted successfully',
          'success',
          true,
          201,
        );
      } else {
        return generalResponse(res, '', 'No Staff Found', 'success', true, 201);
      }
    } catch (error) {
      return generalResponse(
        res,
        error,
        'Something went wrong in Deleting Staff',
        'error',
        true,
        500,
      );
    }
  }

  async findStaffByEmail(email: string) {
    const staff = await this.staffRepository.findOne({
      where: { email },
    });
    return staff;
  }

  async findStaffById(id: number) {
    const staff = await this.staffRepository.findOne({
      where: { id },
    });
    return staff;
  }
}
