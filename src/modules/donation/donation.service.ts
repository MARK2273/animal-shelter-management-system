import { Injectable } from '@nestjs/common';
import { DonationRepository } from './donation.repository';
import { CreateDonationDto } from './dto/donationCreate.dto';
import { Response } from 'express';
import generalResponse from 'src/helper/genrelResponse.helper';
import { Donation } from './donation.entity';

@Injectable()
export class DonationService {
  constructor(private donationRepository: DonationRepository) {}

  async createDonation(
    donation: CreateDonationDto,
    res: Response,
  ): Promise<void> {
    try {
      if (donation.animal) {
        donation = { ...donation, donation_info: 'animal' };
      }

      const result: Donation = this.donationRepository.create(donation);
      const newDonation: Donation = await this.donationRepository.save(result);

      return generalResponse(
        res,
        newDonation,
        'Donation created successfully',
        'success',
        true,
        201,
      );
    } catch (error) {
      return generalResponse(
        res,
        error,
        'Something went wrong in Creating Donation',
        'error',
        true,
        500,
      );
    }
  }

  async getAllDonation(id: number): Promise<Donation[]> {
    return this.donationRepository.find({
      relations: ['customer', 'shelter', 'animal'],
      where: { shelter: { id } },
      select: {
        donation_info: true,
        date: true,
        customer: {
          fname: true,
          lname: true,
          email: true,
          contact: true,
          address: true,
        },
        shelter: {
          name: true,
          email: true,
          address: true,
        },
        animal: {
          weight: true,
          age: true,
          colour: true,
        },
      },
    });
  }
}
