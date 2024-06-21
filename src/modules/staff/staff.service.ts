import { Injectable } from '@nestjs/common';
import { StaffRepository } from './staff.repository';
import { CreateStaffDto } from './dto/createStaff.dto';
import { Response } from 'express';
import generalResponse from 'src/helper/genrelResponse.helper';
import { Shelter } from '../shelter/shelter.entity';
import { UpdateStaffDto } from './dto/staffUpdate.dto';
import { EntityManager } from 'typeorm';
import { FindUser } from './dto/findStaff.dto';
import { verify } from 'argon2';
import { Staff } from './staff.entity';

@Injectable()
export class StaffService {
  constructor(
    public staffRepository: StaffRepository,
    private readonly entityManager: EntityManager,
  ) {}

  async getStaffByShelterId(shelterId: number): Promise<Staff[]> {
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

  async createStaff(
    staff: CreateStaffDto,
    shelter: Shelter,
    res: Response,
  ): Promise<void> {
    try {
      const validStaff: Staff = await this.findStaffByEmail(staff.email);

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

      const createdStaff: {
        id: number;
        name: string;
        email: string;
        contact: string;
      } = await this.entityManager.transaction(
        async (manager: EntityManager) => {
          const newStaff: Staff = this.staffRepository.create(staff);
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
      const staff: Staff = await this.findStaffById(id);
      if (!staff) {
        return generalResponse(res, '', 'No Staff Found', 'success', true, 201);
      }

      const validStaff: Staff = await this.findStaffByEmail(
        updateStaffDto.email,
      );
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

      const data: Staff = await this.staffRepository.save(staff);
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

  async deleteStaff(staff, res: Response): Promise<void> {
    try {
      const staffId: number = +staff.id;
      const validStaff: Staff = await this.findStaffById(staffId);
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

  async findStaffByEmail(email: string): Promise<Staff> {
    const staff = await this.staffRepository.findOne({
      where: { email },
    });
    return staff;
  }

  async findStaffById(id: number): Promise<Staff> {
    const staff = await this.staffRepository.findOne({
      where: { id },
    });
    return staff;
  }

  async verifyUser(userData: FindUser): Promise<{
    success: boolean;
    message: string;
    result: any;
    statusCode: number;
  }> {
    try {
      const data: Staff = await this.staffRepository.findOne({
        where: { email: userData.email },
      });

      if (data) {
        const validate: boolean = await verify(
          data.password,
          userData.password,
        );
        if (validate) {
          return this.returnObjectFunction(
            true,
            201,
            `Login Successfull...`,
            data,
          );
        } else {
          return this.returnObjectFunction(
            false,
            401,
            `Invalid Credentials...`,
          );
        }
      } else {
        return this.returnObjectFunction(false, 404, `User doesn't Exists...`);
      }
    } catch (error) {
      return this.catchError();
    }
  }

  returnObjectFunction = (
    flag: boolean,
    code: number,
    message?: string,
    data?: any,
  ) => {
    return { success: flag, message: message, result: data, statusCode: code };
  };

  catchError = () => {
    return this.returnObjectFunction(false, 500, `Something Went wrong...`);
  };
}
