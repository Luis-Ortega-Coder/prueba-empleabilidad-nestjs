import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { JobVacancy } from './jobVacancy.entity';

@Entity('locations')
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name:'city', type: 'varchar', length: 40 })
  city: string;

  @Column({ name:'country', type: 'varchar', length: 40 })
  country: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz'})
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz'})
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz'})
  deletedAt: Date | null;

  @OneToMany(() => User, (user) => user.location)
  users: User[];

  @OneToMany(() => JobVacancy, (jobVacancy) => jobVacancy.location)
  jobVacancies: JobVacancy[];
}
