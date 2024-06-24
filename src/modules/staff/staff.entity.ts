import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Shelter } from '../shelter/shelter.entity';
import { hash } from 'argon2';
import { Length, Matches } from 'class-validator';
import { MESSAGES, REGEX } from 'src/app.util';

export enum Position {
  OWNER = 'owner',
  WORKER = 'worker',
}

@Entity('staffs')
export class Staff extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'enum', enum: Position })
  position: Position;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  @Length(8, 24)
  @Matches(REGEX.PASSWORD_RULE, {
    message: MESSAGES.PASSWORD_Message,
  })
  password: string;

  @Column({ type: 'varchar' })
  contact: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deleted_at: Date;

  @ManyToMany(
    (): typeof Shelter => Shelter,
    (shelter: Shelter): Staff[] => shelter.staff,
  )
  shelter: Shelter[];

  @BeforeInsert()
  public async hashpass(): Promise<void> {
    this.password = await hash(this.password);
  }
}
