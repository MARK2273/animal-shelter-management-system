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
import { Payment } from './dto/adoptionCreate.dto';

@Entity('adoption')
export class Adoption extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  payment_mode: Payment;

  @Column({ type: 'varchar' })
  adoption_info: string;

  @Column({ type: 'date' })
  date: Date;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deleted_at: Date;

  @ManyToOne(() => Animal, (animal) => animal.donation)
  @JoinColumn()
  animal?: Animal;

  @ManyToOne(() => Customer, (customer) => customer.donation)
  @JoinColumn()
  customer: Customer;

  @ManyToOne(() => Shelter, (shelter) => shelter.donation)
  @JoinColumn()
  shelter: Shelter;
}
