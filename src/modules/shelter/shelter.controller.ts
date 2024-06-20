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
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';

import { ShelterService } from './shelter.service';
import {
  CreateShelterDto,
  CreateShelterWithStaffDto,
} from './dto/createShelter.dto';
import { ShelterResponseDto } from './dto/shelterResponse.dto';
import { UpdateShelterDto } from './dto/shelterUpdate.dto';
import {
  ApiBody,
  ApiConsumes,
  ApiParam,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthGaurd } from '../staff/staff.guard';

@UseGuards(AuthGaurd)
@ApiBearerAuth()
@Controller('shelter')
export class ShelterController {
  constructor(private shelterService: ShelterService) {}

  @UseGuards(AuthGaurd)
  @Post('/create')
  @ApiTags('Shelter')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({
    type: CreateShelterDto,
  })
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  async createCustomer(
    @Body() shelterData: CreateShelterDto,
    @Res() res: Response,
  ) {
    return await this.shelterService.createShelter(shelterData, res);
  }

  @Post('/createwithstaff')
  @ApiTags('Shelter')
  @ApiConsumes('application/json')
  @ApiBody({
    type: CreateShelterWithStaffDto,
  })
  async createShelterWithStaff(
    @Body() createShelterWithDto: CreateShelterWithStaffDto,
  ): Promise<ShelterResponseDto> {
    return this.shelterService.createShelterWithStaff(createShelterWithDto);
  }

  @Put('/update/:id')
  @ApiTags('Shelter')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({
    type: UpdateShelterDto,
  })
  async updateShelter(
    @Param('id') id: number,
    @Body() updateShelterDto: UpdateShelterDto,
    @Res() res: Response,
  ) {
    return await this.shelterService.updateShelter(id, updateShelterDto, res);
  }

  @Delete('/delete/:id')
  @ApiTags('Shelter')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiParam({
    name: 'id',
  })
  async deleteShelter(
    @Param() id: number,
    @Res() res: Response,
  ): Promise<void> {
    return this.shelterService.deleteShelter(id, res);
  }
}
