import { DataSource, Repository } from 'typeorm';
import { Customer } from './customer.entity';
import { Injectable } from '@nestjs/common';

// @EntityRepository(Customer)
@Injectable()
export class CustomerRepository extends Repository<Customer> {
  constructor(private readonly dataSource: DataSource) {
    super(Customer, dataSource.createEntityManager());
  }
}
