import { DataSource, Repository } from 'typeorm';
import { Donation } from './donation.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DonationRepository extends Repository<Donation> {
  constructor(private readonly dataSource: DataSource) {
    super(Donation, dataSource.createEntityManager());
  }
}
