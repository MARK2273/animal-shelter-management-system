import { DataSource, Repository } from 'typeorm';
import { Adoption } from './adoption.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AdoptionRepository extends Repository<Adoption> {
  constructor(private readonly dataSource: DataSource) {
    super(Adoption, dataSource.createEntityManager());
  }
}
