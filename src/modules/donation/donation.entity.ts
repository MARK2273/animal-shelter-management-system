import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Animal } from '../animal/animal.entity';
import { Customer } from '../customer/customer.entity';
import { Shelter } from '../shelter/shelter.entity';
import { PetAccessories } from '../petAccessories/petAccessory.entity';

@Entity('donations')
export class Donation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  donation_info: string;

  @Column({ type: 'date' })
  date: Date;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deleted_at: Date;

  @ManyToOne(
    (): typeof Animal => Animal,
    (animal: Animal): Donation[] => animal.donation,
  )
  @JoinColumn({ name: 'to_donation_id' })
  animal?: Animal;

  @ManyToOne(
    (): typeof PetAccessories => PetAccessories,
    (petAccessories: PetAccessories): Donation[] => petAccessories.donation,
  )
  @JoinColumn({ name: 'to_donation_id' })
  petaccessories?: PetAccessories;

  @ManyToOne(
    (): typeof Customer => Customer,
    (customer: Customer): Donation[] => customer.donation,
  )
  @JoinColumn()
  customer: Customer;

  @ManyToOne(
    (): typeof Shelter => Shelter,
    (shelter: Shelter): Donation[] => shelter.donation,
  )
  @JoinColumn()
  shelter: Shelter;
}
