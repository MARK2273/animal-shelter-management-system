import {
  Controller,
  Post,
  Body,
  HttpCode,
  UsePipes,
  ValidationPipe,
  Res,
  Put,
  Param,
  Get,
  Delete,
} from '@nestjs/common';
import { Response } from 'express';

import { StaffService } from './staff.service';
import { CreateStaffDto } from './dto/createStaff.dto';
import { ShelterService } from '../shelter/shelter.service';
import { UpdateStaffDto } from './dto/staffUpdate.dto';

@Controller('staff')
export class StaffController {
  constructor(
    private staffService: StaffService,
    private shelterService: ShelterService,
  ) {}

  @Get('/getall/:id')
  async getAllStaff(@Param('id') id: number) {
    return this.staffService.getStaffByShelterId(id);
  }

  @Post('/create')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  async createStaff(@Body() staffData: CreateStaffDto, @Res() res: Response) {
    const shelter = await this.shelterService.findShelterId(
      staffData.sheltersId,
    );

    return await this.staffService.createStaff(staffData, shelter, res);
  }

  @Put('/update/:id')
  async updateMedication(
    @Param('id') id: number,
    @Body() updateStaffDto: UpdateStaffDto,
    @Res() res: Response,
  ) {
    return this.staffService.updateStaff(id, updateStaffDto, res);
  }

  @Delete('/delete/:id')
  async deleteMedication(@Param() id: number, @Res() res: Response) {
    return await this.staffService.deleteStaff(id, res);
  }
}
