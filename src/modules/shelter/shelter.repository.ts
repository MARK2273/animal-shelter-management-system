import { DataSource, Repository } from 'typeorm';
import { Shelter } from './shelter.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ShelterRepository extends Repository<Shelter> {
  constructor(private readonly dataSource: DataSource) {
    super(Shelter, dataSource.createEntityManager());
  }
}
