import { DataSource, Repository } from 'typeorm';
import { PetAccessories } from './petAccessory.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PetAccessoriesRepository extends Repository<PetAccessories> {
  constructor(private readonly dataSource: DataSource) {
    super(PetAccessories, dataSource.createEntityManager());
  }
}
