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
import { Adoption } from '../Adoption/adoption.entity';

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

  @OneToMany(() => Donation, (donation) => donation.animal, {
    cascade: true,
  })
  donation: Donation[];

  @OneToMany(() => Adoption, (adoption) => adoption.animal, {
    cascade: true,
  })
  adoption: Adoption[];
}
