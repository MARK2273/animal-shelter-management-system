import { DataSource, Repository } from 'typeorm';
import { Staff } from './staff.entity';
import { Injectable } from '@nestjs/common';

// @EntityRepository(Customer)
@Injectable()
export class StaffRepository extends Repository<Staff> {
  constructor(private readonly dataSource: DataSource) {
    super(Staff, dataSource.createEntityManager());
  }
}
