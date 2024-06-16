import { DataSource, Repository } from 'typeorm';
import { Medication } from './medication.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MedicationRepository extends Repository<Medication> {
  constructor(private readonly dataSource: DataSource) {
    super(Medication, dataSource.createEntityManager());
  }
}
