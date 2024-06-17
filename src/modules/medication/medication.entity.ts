import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Breed } from '../breed/breed.entity';

@Entity('medications')
export class Medication extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  allergie: string;

  @Column({ type: 'varchar' })
  veterinarian: string;

  @Column({ type: 'date' })
  vaccination_date: Date;

  @ManyToOne(() => Breed, (breed) => breed.medication)
  breed: Breed;
}
