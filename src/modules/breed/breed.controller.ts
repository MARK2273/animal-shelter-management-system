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
  Get,
} from '@nestjs/common';
import { Response } from 'express';

import { BreedService } from './breed.service';
import { BreedDto, BreedWithMedicationDto } from './dto/breed.dto';
import { UpdateBreedDto } from './dto/breedUpdate.dto';
import { ApiBody, ApiConsumes, ApiParam, ApiTags } from '@nestjs/swagger';

@Controller('breed')
export class BreedController {
  constructor(private breedService: BreedService) {}

  @Get('/getall')
  @ApiTags('Breed')
  async getAllBreeds() {
    return this.breedService.getAllBreeds();
  }

  @Post('/create')
  @HttpCode(200)
  @ApiTags('Breed')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({
    type: BreedDto,
  })
  @UsePipes(ValidationPipe)
  async createBreed(@Body() breedData: BreedDto, @Res() res: Response) {
    return await this.breedService.createBreed(breedData, res);
  }

  @Post('/createwithmedication')
  @HttpCode(200)
  @ApiTags('Breed')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({
    type: BreedWithMedicationDto,
  })
  @UsePipes(ValidationPipe)
  async createBreedWithMedication(
    @Body() breedData: BreedWithMedicationDto,
    @Res() res: Response,
  ) {
    return await this.breedService.createBreedWithMedication(breedData, res);
  }

  @Put('/update/:id')
  @ApiTags('Breed')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({
    type: UpdateBreedDto,
  })
  async update(
    @Param('id') id: number,
    @Body() updateBreedDto: UpdateBreedDto,
    @Res() res: Response,
  ) {
    return this.breedService.updateBreed(id, updateBreedDto, res);
  }

  @Delete('/delete/:breedId')
  @ApiTags('Breed')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiParam({
    name: 'breedId',
  })
  async deleteMedication(@Param() breedId: number, @Res() res: Response) {
    return await this.breedService.deleteBreed(breedId, res);
  }
}
