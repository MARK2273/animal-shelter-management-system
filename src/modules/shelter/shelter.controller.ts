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
import { UpdateShelterDto } from './dto/shelterUpdate.dto';
import {
  ApiBody,
  ApiConsumes,
  ApiParam,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthGaurd } from '../staff/staff.guard';
import { RoleGuard } from 'src/decorators/Roles/role.guard';
import { Roles } from 'src/decorators/Roles/roles.decorator';

@UseGuards(AuthGaurd)
@ApiBearerAuth()
@Controller('shelter')
export class ShelterController {
  constructor(private shelterService: ShelterService) {}

  @UseGuards(AuthGaurd, RoleGuard)
  @Roles('owner')
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
  ): Promise<void> {
    return await this.shelterService.createShelter(shelterData, res);
  }

  @UseGuards(AuthGaurd, RoleGuard)
  @Roles('owner')
  @Post('/createwithstaff')
  @ApiTags('Shelter')
  @ApiConsumes('application/json')
  @ApiBody({
    type: CreateShelterWithStaffDto,
  })
  async createShelterWithStaff(
    @Body() createShelterWithDto: CreateShelterWithStaffDto,
    @Res() res: Response,
  ): Promise<void> {
    return this.shelterService.createShelterWithStaff(
      createShelterWithDto,
      res,
    );
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
  ): Promise<void> {
    return await this.shelterService.updateShelter(id, updateShelterDto, res);
  }

  @UseGuards(AuthGaurd, RoleGuard)
  @Roles('owner')
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
