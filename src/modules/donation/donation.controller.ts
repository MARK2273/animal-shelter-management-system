import {
  Controller,
  Post,
  Body,
  HttpCode,
  UsePipes,
  ValidationPipe,
  Res,
  Param,
  Get,
} from '@nestjs/common';
import { Response } from 'express';

import { DonationService } from './donation.service';
import { CreateDonationDto } from './dto/donationCreate.dto';
import { AnimalService } from '../animal/animal.service';
// import generalResponse from 'src/helper/genrelResponse.helper';
import { CustomerService } from '../customer/customer.service';
import { ShelterService } from '../shelter/shelter.service';
import generalResponse from 'src/helper/genrelResponse.helper';
import { ApiBody, ApiConsumes, ApiParam, ApiTags } from '@nestjs/swagger';

@Controller('donation')
export class DonationController {
  constructor(
    private donationService: DonationService,
    private animalService: AnimalService,
    private customerservice: CustomerService,
    private shelterService: ShelterService,
  ) {}

  @Get('/get/:shelterId')
  @ApiTags('Donation')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiParam({
    name: 'shelterId',
  })
  async getAllDonation(@Param('shelterId') shelterId: number) {
    return this.donationService.getAllDonation(shelterId);
  }

  @Post('/create')
  @HttpCode(200)
  @ApiTags('Donation')
  @ApiConsumes('application/json')
  @ApiBody({
    type: CreateDonationDto,
  })
  @UsePipes(ValidationPipe)
  async createDonation(
    @Body() donationData: CreateDonationDto,
    @Res() res: Response,
  ) {
    console.log(donationData);
    const customer = await this.customerservice.findCustomerById(
      +donationData.customer.id,
    );

    if (!customer) {
      return generalResponse(res, '', 'No customer Found', 'error', true, 400);
    }

    const shelter = await this.shelterService.findShelterId(
      +donationData.shelter.id,
    );

    if (!shelter) {
      return generalResponse(res, '', 'No shelter Found', 'error', true, 400);
    }

    let animal;
    if (donationData.animal) {
      animal = await this.animalService.findAnimalId(+donationData.animal.id);
    }

    if (donationData.animal && !animal) {
      return generalResponse(res, '', 'No Animal Found', 'error', true, 400);
    }

    if (!donationData.animal) {
      return await this.donationService.createDonation(donationData, res);
    }
    return await this.donationService.createDonation(
      { ...donationData, donation_info: 'animal' },
      res,
    );
  }
}
