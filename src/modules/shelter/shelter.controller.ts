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

import { ShelterService } from './shelter.service';
import { CreateShelterDto } from './dto/createShelter.dto';

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
    return await this.shelterService.createCustomer(shelterData, res);
  }
}
