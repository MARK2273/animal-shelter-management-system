import { AnimalDescription } from './../animalDescription/animalDescription.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AnimalType } from '../animalType/animalType.entity';
import { Breed } from '../breed/breed.entity';
import { Shelter } from '../shelter/shelter.entity';
import { Donation } from '../donation/donation.entity';
import { Adoption } from '../Adoption/adoption.entity';

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

  @ManyToOne(
    (): typeof AnimalType => AnimalType,
    (animalType: AnimalType): Animal[] => animalType.animal,
  )
  animalType: AnimalType;

  @ManyToOne(
    (): typeof Breed => Breed,
    (breed: Breed): Animal[] => breed.animal,
  )
  breed: Breed;

  @OneToOne(
    (): typeof AnimalDescription => AnimalDescription,
    (animalDescription: AnimalDescription): Animal => animalDescription.animal,
  )
  @JoinColumn()
  animalDescription: AnimalDescription;

  @ManyToOne(
    (): typeof Shelter => Shelter,
    (shelter: Shelter): Animal[] => shelter.animals,
  )
  shelter: Shelter;

  @OneToMany(
    (): typeof Donation => Donation,
    (donation: Donation): Animal => donation.animal,
    {
      cascade: true,
    },
  )
  donation: Donation[];

  @OneToMany(
    (): typeof Adoption => Adoption,
    (adoption: Adoption): Animal => adoption.animal,
    {
      cascade: true,
    },
  )
  adoption: Adoption[];
}
