import { Adoption } from '../Adoption/adoption.entity';
import { Animal } from '../animal/animal.entity';
import { Donation } from '../donation/donation.entity';
import { Staff } from '../staff/staff.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('shelters')
export class Shelter extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  address: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deleted_at: Date;

  @ManyToMany(() => Staff, (staff) => staff.shelter)
  @JoinTable()
  staff: Staff[];

  @OneToMany(() => Animal, (animal) => animal.shelter)
  animals: Animal[];

  @OneToMany(() => Donation, (donation) => donation.animal, {
    cascade: true,
  })
  donation: Donation[];

  @OneToMany(() => Adoption, (adoption) => adoption.animal, {
    cascade: true,
  })
  adoption: Adoption[];
}
