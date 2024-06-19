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
} from '@nestjs/common';
import { Response } from 'express';

import { AdoptionService } from './adoption.service';
import { CreateAdoptionDto } from './dto/adoptionCreate.dto';
import { AnimalService } from '../animal/animal.service';
import { CustomerService } from '../customer/customer.service';
import { ShelterService } from '../shelter/shelter.service';
import generalResponse from 'src/helper/genrelResponse.helper';

@Controller('adoption')
export class adoptionController {
  constructor(
    private adoptionService: AdoptionService,
    private animalService: AnimalService,
    private customerservice: CustomerService,
    private shelterService: ShelterService,
  ) {}

  @Get('/get/:shelterId')
  async getMedicationsByBreedId(@Param('shelterId') shelterId: number) {
    return this.adoptionService.getAllAdoption(shelterId);
  }

  @Post('/create')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  async createAdoption(
    @Body() adoptionData: CreateAdoptionDto,
    @Res() res: Response,
  ) {
    const customer = await this.customerservice.findCustomerById(
      +adoptionData.customer.id,
    );

    if (!customer) {
      return generalResponse(res, '', 'No customer Found', 'error', true, 400);
    }

    const shelter = await this.shelterService.findShelterId(
      +adoptionData.shelter.id,
    );

    if (!shelter) {
      return generalResponse(res, '', 'No shelter Found', 'error', true, 400);
    }

    let animal;
    if (adoptionData.animal) {
      animal = await this.animalService.findAnimalId(+adoptionData.animal.id);
    }

    if (adoptionData.animal && !animal) {
      return generalResponse(res, '', 'No Animal Found', 'error', true, 400);
    }

    if (!adoptionData.animal) {
      return await this.adoptionService.createAdoption(adoptionData, res);
    }
    return await this.adoptionService.createAdoption(
      { ...adoptionData, adoption_info: 'animal' },
      res,
    );
  }
}
