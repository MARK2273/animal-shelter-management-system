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

import { BreedService } from './breed.service';
import { BreedDto } from './dto/breed.dto';

@Controller('breed')
export class BreedController {
  constructor(private breedService: BreedService) {}

  @Post('/create')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  async createBreed(@Body() breedData: BreedDto, @Res() res: Response) {
    return await this.breedService.createBreed(breedData, res);
  }
}
