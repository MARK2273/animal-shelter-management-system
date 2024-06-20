import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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

  @ManyToOne(
    (): typeof Breed => Breed,
    (breed: Breed): Medication[] => breed.medication,
  )
  breed: Breed;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deleted_at: Date;
}
