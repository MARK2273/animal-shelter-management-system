import {
  Controller,
  Post,
  Body,
  HttpCode,
  UsePipes,
  ValidationPipe,
  Res,
  Get,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';

import { PetAccessoriesService } from './petAccessories.service';
import { PetAccessoriesDto } from './dto/petAccessories.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { UpdatePetAccessoriesDto } from './dto/UpdatePetAccessories.dto';
import { AuthGaurd } from '../staff/staff.guard';

@Controller('petAccessories')
export class petAccessoriesController {
  constructor(private petAccessoriesService: PetAccessoriesService) {}

  @UseGuards(AuthGaurd)
  @ApiBearerAuth()
  @Get('/get/:shelterId')
  @ApiTags('Pet Accessories')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiParam({
    name: 'shelterId',
  })
  async getPetAccessoriesByShelterId(
    @Param('shelterId') shelterId: number,
    @Res() res: Response,
  ): Promise<void> {
    return this.petAccessoriesService.getPetAccessoriesByShelterId(
      shelterId,
      res,
    );
  }

  @UseGuards(AuthGaurd)
  @ApiBearerAuth()
  @Post('/create')
  @ApiTags('Pet Accessories')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({
    type: PetAccessoriesDto,
  })
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  async createCustomer(
    @Body() petAccessoriesData: PetAccessoriesDto,
    @Res() res: Response,
  ) {
    return await this.petAccessoriesService.createPetAccessories(
      petAccessoriesData,
      res,
    );
  }

  @UseGuards(AuthGaurd)
  @ApiBearerAuth()
  @Put('/update/:id')
  @ApiTags('Pet Accessories')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({
    type: UpdatePetAccessoriesDto,
  })
  async updateMedication(
    @Param('id') id: number,
    @Body() updatePetAccessoriesDto: UpdatePetAccessoriesDto,
    @Res() res: Response,
  ): Promise<void> {
    return this.petAccessoriesService.updatePetAccessories(
      id,
      updatePetAccessoriesDto,
      res,
    );
  }

  @UseGuards(AuthGaurd)
  @ApiBearerAuth()
  @Delete('/delete/:id')
  @ApiTags('Pet Accessories')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiParam({
    name: 'id',
  })
  async deletePetAccessories(
    @Param() petAccessoriesId: number,
    @Res() res: Response,
  ): Promise<void> {
    return await this.petAccessoriesService.deletePetAccessories(
      petAccessoriesId,
      res,
    );
  }
}
