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
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';

@Controller('animalType')
export class AnimalTypeController {
  constructor(private animalTypeService: AnimalTypeService) {}

  @Post('/create')
  @HttpCode(200)
  @ApiTags('AnimalType')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({
    type: AnimalTypeDto,
  })
  @UsePipes(ValidationPipe)
  async createAnimalType(
    @Body() animalTypeData: AnimalTypeDto,
    @Res() res: Response,
  ) {
    return await this.animalTypeService.createAnimalType(animalTypeData, res);
  }
}
