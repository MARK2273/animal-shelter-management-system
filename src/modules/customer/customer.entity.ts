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
import { Donation } from '../donation/donation.entity';
import { Adoption } from '../adoption/adoption.entity';
import { Animal } from '../animal/animal.entity';

@Entity('customers')
export class Customer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  fname: string;

  @Column({ type: 'varchar' })
  lname: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  contact: string;

  @Column({ type: 'varchar' })
  address: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deleted_at: Date;

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
