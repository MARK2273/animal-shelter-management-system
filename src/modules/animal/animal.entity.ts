import { AnimalDescription } from './../animalDescription/animalDescription.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AnimalType } from '../animalType/animalType.entity';
import { Breed } from '../breed/breed.entity';
import { Shelter } from '../shelter/shelter.entity';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

@Entity('animals')
export class Animal extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  weight: number;

  @Column({ type: 'int' })
  age: number;

  @Column({ type: 'int' })
  rate: number;

  @Column({ type: 'varchar' })
  colour: string;

  @Column({ type: 'enum', enum: Gender })
  gender: Gender;

  @Column({ type: 'varchar' })
  cage_size: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deleted_at: Date;

  @ManyToOne(() => AnimalType, (animalType) => animalType.animal)
  animalType: AnimalType;

  @ManyToOne(() => Breed, (breed) => breed.animal)
  breed: Breed;

  @OneToOne(
    () => AnimalDescription,
    (animalDescription) => animalDescription.animal,
  )
  @JoinColumn()
  animalDescription: AnimalDescription;

  @ManyToOne(() => Shelter, (shelter) => shelter.animals)
  shelter: Shelter;
}
