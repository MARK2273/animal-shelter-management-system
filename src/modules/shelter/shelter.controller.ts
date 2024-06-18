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
  Delete,
} from '@nestjs/common';
import { Response } from 'express';

import { ShelterService } from './shelter.service';
import {
  CreateShelterDto,
  CreateShelterWithStaffDto,
} from './dto/createShelter.dto';
import { ShelterResponseDto } from './dto/shelterResponse.dto';
import { UpdateShelterDto } from './dto/shelterUpdate.dto';

@Controller('shelter')
export class ShelterController {
  constructor(private shelterService: ShelterService) {}

  @Post('/create')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  async createCustomer(
    @Body() shelterData: CreateShelterDto,
    @Res() res: Response,
  ) {
    return await this.shelterService.createShelter(shelterData, res);
  }

  @Post('/createwithstaff')
  async createShelterWithStaff(
    @Body() createShelterWithDto: CreateShelterWithStaffDto,
  ): Promise<ShelterResponseDto> {
    return this.shelterService.createShelterWithStaff(createShelterWithDto);
  }

  @Put('/update/:id')
  async updateShelter(
    @Param('id') id: number,
    @Body() updateShelterDto: UpdateShelterDto,
    @Res() res: Response,
  ) {
    return await this.shelterService.updateShelter(id, updateShelterDto, res);
  }

  @Delete('/delete/:id')
  async deleteShelter(
    @Param() id: number,
    @Res() res: Response,
  ): Promise<void> {
    return this.shelterService.deleteShelter(id, res);
  }
}
