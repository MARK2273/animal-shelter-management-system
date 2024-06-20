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
import { ApiBody, ApiConsumes, ApiParam, ApiTags } from '@nestjs/swagger';

@Controller('staff')
export class StaffController {
  constructor(
    private staffService: StaffService,
    private shelterService: ShelterService,
  ) {}

  @Get('/getall/:id')
  @ApiTags('Staff')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiParam({
    name: 'id',
  })
  async getAllStaff(@Param('id') id: number) {
    return this.staffService.getStaffByShelterId(id);
  }

  @Post('/create')
  @HttpCode(200)
  @ApiTags('Staff')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({
    type: CreateStaffDto,
  })
  @UsePipes(ValidationPipe)
  async createStaff(@Body() staffData: CreateStaffDto, @Res() res: Response) {
    const shelter = await this.shelterService.findShelterId(
      staffData.sheltersId,
    );

    return await this.staffService.createStaff(staffData, shelter, res);
  }

  @Put('/update/:id')
  @ApiTags('Staff')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({
    type: UpdateStaffDto,
  })
  async updateMedication(
    @Param('id') id: number,
    @Body() updateStaffDto: UpdateStaffDto,
    @Res() res: Response,
  ) {
    return this.staffService.updateStaff(id, updateStaffDto, res);
  }

  @Delete('/delete/:id')
  @ApiTags('Staff')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiParam({
    name: 'id',
  })
  async deleteStaff(@Param() id: number, @Res() res: Response) {
    return await this.staffService.deleteStaff(id, res);
  }
}
