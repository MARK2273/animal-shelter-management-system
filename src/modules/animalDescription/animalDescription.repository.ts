import { DataSource, Repository } from 'typeorm';
import { AnimalDescription } from './animalDescription.entity';
import { Injectable } from '@nestjs/common';

// @EntityRepository(Customer)
@Injectable()
export class AnimalDescriptionRepository extends Repository<AnimalDescription> {
  constructor(private readonly dataSource: DataSource) {
    super(AnimalDescription, dataSource.createEntityManager());
  }
}
