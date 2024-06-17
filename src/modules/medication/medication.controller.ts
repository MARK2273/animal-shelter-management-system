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

import { MedicationService } from './medication.service';
import { MedicationDto } from './dto/medication.dto';
import { BreedService } from '../breed/breed.service';

@Controller('medication')
export class MedicationController {
  constructor(
    private medicationService: MedicationService,
    private breedService: BreedService,
  ) {}

  @Post('/create')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  async createMedication(
    @Body() medicationData: MedicationDto,
    @Res() res: Response,
  ) {
    const breed = await this.breedService.findBreedId(medicationData.breedId);
    return await this.medicationService.createMedication(
      medicationData,
      breed,
      res,
    );
  }
}
