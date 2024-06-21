import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Shelter } from '../shelter/shelter.entity';
import { Donation } from '../donation/donation.entity';

@Entity('pet_accessories')
export class PetAccessories extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'int' })
  price: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deleted_at: Date;

  @ManyToOne(
    (): typeof Shelter => Shelter,
    (shelter: Shelter): PetAccessories[] => shelter.petAccessories,
  )
  shelter: Shelter;

  @OneToMany(
    (): typeof Donation => Donation,
    (donation: Donation): PetAccessories => donation.petaccessories,
    {
      cascade: true,
    },
  )
  donation: Donation[];
}
