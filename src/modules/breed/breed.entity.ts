import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Medication } from '../medication/medication.entity';
import { Animal } from '../animal/animal.entity';

@Entity('breeds')
export class Breed extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Medication, (medication) => medication.breed, {
    onDelete: 'CASCADE',
  })
  medication: Medication[];

  @OneToMany(() => Animal, (animal) => animal.breed, {
    onDelete: 'CASCADE',
  })
  animal: Animal[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deleted_at: Date;
}
