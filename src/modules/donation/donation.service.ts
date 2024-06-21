import { Injectable } from '@nestjs/common';
import { DonationRepository } from './donation.repository';
import { Response } from 'express';
import generalResponse from 'src/helper/genrelResponse.helper';
import { Donation } from './donation.entity';

@Injectable()
export class DonationService {
  constructor(private donationRepository: DonationRepository) {}

  async createDonation(donation, type: string, res: Response): Promise<void> {
    try {
      let newDonation = donation;
      if (type === 'animal') {
        newDonation = {
          ...newDonation,
          animal: { id: donation.is_to_donationId.id },
        };
      }
      if (type === 'general') {
        newDonation = {
          ...newDonation,
          petaccessories: { id: donation.is_to_donationId.id },
        };
      }
      const result = this.donationRepository.create(newDonation);

      await this.donationRepository.save(result);

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
