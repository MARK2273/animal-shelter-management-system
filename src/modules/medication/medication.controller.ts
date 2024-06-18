import {
  Controller,
  Post,
  Body,
  HttpCode,
  UsePipes,
  ValidationPipe,
  Res,
  Param,
  Delete,
  Put,
  Get,
} from '@nestjs/common';
import { Response } from 'express';

import { MedicationService } from './medication.service';
import { MedicationDto } from './dto/medication.dto';
import { BreedService } from '../breed/breed.service';
import generalResponse from 'src/helper/genrelResponse.helper';
import { UpdateMedicationDto } from './dto/medicationUpdate.dto';

@Controller('medication')
export class MedicationController {
  constructor(
    private medicationService: MedicationService,
    private breedService: BreedService,
  ) {}

  @Get('/get/:breedId')
  async getMedicationsByBreedId(@Param('breedId') breedId: number) {
    return this.medicationService.getMedicationsByBreedId(breedId);
  }

  @Get('/getall')
  async getAllMedications() {
    return this.medicationService.getAllMedications();
  }

  @Post('/create')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  async createMedication(
    @Body() medicationData: MedicationDto,
    @Res() res: Response,
  ) {
    console.log(medicationData);
    const breed = await this.breedService.findBreedId(medicationData.breedId);
    if (breed) {
      return await this.medicationService.createMedication(
        medicationData,
        breed,
        res,
      );
    } else {
      return generalResponse(res, '', 'No breed Found', 'error', true, 400);
    }
  }

  @Put('/update/:id')
  async updateMedication(
    @Param('id') id: number,
    @Body() updateMedicationDto: UpdateMedicationDto,
    @Res() res: Response,
  ) {
    return this.medicationService.updateMedication(
      id,
      updateMedicationDto,
      res,
    );
  }

  @Delete('/delete/:breedId')
  async deleteMedication(@Param() breedId: number, @Res() res: Response) {
    return await this.medicationService.deleteMedication(breedId, res);
  }
}
