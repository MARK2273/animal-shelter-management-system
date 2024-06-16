import { DataSource, Repository } from 'typeorm';
import { AnimalType } from './animalType.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AnimalTypeRepository extends Repository<AnimalType> {
  constructor(private readonly dataSource: DataSource) {
    super(AnimalType, dataSource.createEntityManager());
  }
}
