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

import { DonationService } from './donation.service';
import { CreateDonationDto } from './dto/donationCreate.dto';

@Controller('donation')
export class DonationController {
  constructor(private donationService: DonationService) {}

  @Post('/create')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  async createDonation(
    @Body() donationData: CreateDonationDto,
    @Res() res: Response,
  ) {
    return await this.donationService.createDonation(donationData, res);
  }
}
