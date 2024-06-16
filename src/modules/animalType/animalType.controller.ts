import {
  Controller,
  Post,
  Body,
  HttpCode,
  UsePipes,
  ValidationPipe,
  Res,
} from '@nestjs/common';
import { Response } from 'express';

import { AnimalTypeService } from './animalType.service';
import { AnimalTypeDto } from './dto/animalType.dto';

@Controller('animalType')
export class AnimalTypeController {
  constructor(private animalTypeService: AnimalTypeService) {}

  @Post('/create')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  async createAnimalType(
    @Body() animalTypeData: AnimalTypeDto,
    @Res() res: Response,
  ) {
    return await this.animalTypeService.createCustomer(animalTypeData, res);
  }
}