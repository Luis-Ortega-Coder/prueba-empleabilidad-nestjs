import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Index,
} from 'typeorm';
import { Access } from './auth.entity';
import { Location } from './location.entity';

@Entity('users')
@Index('IDX_USERS', ['phone'], { unique:true })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  phone: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
  deletedAt: Date;

  @ManyToOne(() => Location, (location) => location.users, {
    nullable: false,
  })
  @JoinColumn({ name: 'location_id' })
  location: Location;

  @OneToMany(() => Access, (access) => access.user)
  accesses: Access[];
}
