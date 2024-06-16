import { DataSource, Repository } from 'typeorm';
import { Breed } from './breed.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BreedRepository extends Repository<Breed> {
  constructor(private readonly dataSource: DataSource) {
    super(Breed, dataSource.createEntityManager());
  }
}
