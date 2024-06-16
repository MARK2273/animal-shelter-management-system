import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Medication } from '../medication/medication.entity';

@Entity('breeds')
export class Breed extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Medication, (medication) => medication.breed)
  medication: Medication[];
}
