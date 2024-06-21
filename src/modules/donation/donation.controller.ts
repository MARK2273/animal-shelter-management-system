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
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';

import { DonationService } from './donation.service';
import { CreateDonationDto } from './dto/donationCreate.dto';
import { AnimalService } from '../animal/animal.service';
// import generalResponse from 'src/helper/genrelResponse.helper';
import { CustomerService } from '../customer/customer.service';
import { ShelterService } from '../shelter/shelter.service';
import generalResponse from 'src/helper/genrelResponse.helper';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGaurd } from '../staff/staff.guard';
import { Donation } from './donation.entity';
import { Customer } from '../customer/customer.entity';
import { Shelter } from '../shelter/shelter.entity';
import { Animal } from '../animal/animal.entity';
import { PetAccessoriesService } from '../petAccessories/petAccessories.service';
import { PetAccessories } from '../petAccessories/petAccessory.entity';

@Controller('donation')
export class DonationController {
  constructor(
    private donationService: DonationService,
    private animalService: AnimalService,
    private customerservice: CustomerService,
    private shelterService: ShelterService,
    private petAccessoriesService: PetAccessoriesService,
  ) {}

  @UseGuards(AuthGaurd)
  @ApiBearerAuth()
  @Get('/get/:shelterId')
  @ApiTags('Donation')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiParam({
    name: 'shelterId',
  })
  async getAllDonation(
    @Param('shelterId') shelterId: number,
  ): Promise<Donation[]> {
    return this.donationService.getAllDonation(shelterId);
  }

  @UseGuards(AuthGaurd)
  @ApiBearerAuth()
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
  ): Promise<void> {
    try {
      const customer: Customer = await this.customerservice.findCustomerById(
        +donationData.customer.id,
      );

      if (!customer) {
        return generalResponse(
          res,
          '',
          'No customer Found',
          'error',
          true,
          400,
        );
      }

      const shelter: Shelter = await this.shelterService.findShelterId(
        +donationData.shelter.id,
      );

      if (!shelter) {
        return generalResponse(res, '', 'No shelter Found', 'error', true, 400);
      }

      const isAnimal: Animal = await this.animalService.findAnimalId(
        donationData.is_to_donationId.id,
      );

      if (isAnimal && donationData.Type === 'animal') {
        const type = 'animal';
        return await this.donationService.createDonation(
          { ...donationData, donation_info: 'animal' },
          type,
          res,
        );
      }

      const isGeneral: PetAccessories =
        await this.petAccessoriesService.validPetAccessoriesById(
          donationData.is_to_donationId.id,
        );

      if (isGeneral && donationData.Type === 'general') {
        const type = 'general';

        return await this.donationService.createDonation(
          { ...donationData, donation_info: 'general' },
          type,
          res,
        );
      }

      return generalResponse(res, '', 'No Record Found', 'error', true, 400);
    } catch (error) {
      return generalResponse(
        res,
        error,
        'Something Went Wrong',
        'error',
        true,
        400,
      );
    }
  }
}
