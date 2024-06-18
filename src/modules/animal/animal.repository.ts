import { DataSource, Repository } from 'typeorm';
import { Animal } from './animal.entity';
import { Injectable } from '@nestjs/common';

// @EntityRepository(Customer)
@Injectable()
export class AnimalRepository extends Repository<Animal> {
  constructor(private readonly dataSource: DataSource) {
    super(Animal, dataSource.createEntityManager());
  }
}
