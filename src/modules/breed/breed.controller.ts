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

@Controller('breed')
export class BreedController {
  constructor(private breedService: BreedService) {}

  @Get('/getall')
  async getAllBreeds() {
    return this.breedService.getAllBreeds();
  }

  @Post('/create')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  async createBreed(@Body() breedData: BreedDto, @Res() res: Response) {
    return await this.breedService.createBreed(breedData, res);
  }

  @Post('/createwithmedication')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  async createBreedWithMedication(
    @Body() breedData: BreedWithMedicationDto,
    @Res() res: Response,
  ) {
    return await this.breedService.createBreedWithMedication(breedData, res);
  }

  @Put('/update/:id')
  async update(
    @Param('id') id: number,
    @Body() updateBreedDto: UpdateBreedDto,
    @Res() res: Response,
  ) {
    return this.breedService.updateBreed(id, updateBreedDto, res);
  }

  @Delete('/delete/:breedId')
  async deleteMedication(@Param() breedId: number, @Res() res: Response) {
    return await this.breedService.deleteBreed(breedId, res);
  }
}
