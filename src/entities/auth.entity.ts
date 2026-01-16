import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Index,
} from 'typeorm';
import { Role } from './role.entity';
import { User } from './user.entity';
import { JobVacancyUser } from './application.entity';

@Entity('access')
@Index('IDX_UNIQUE_ACCESS', ['email'], { unique: true })
export class Access {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'email', type: 'varchar', length: 60 })
  email: string;

  @Column({ name: 'password', type: 'varchar', length: 120 })
  password: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
  deletedAt: Date | null;

  @ManyToOne(() => Role, (role) => role.accesses, { nullable: false })
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @ManyToOne(() => User, (user) => user.accesses, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => JobVacancyUser, (jobVacancyUser) => jobVacancyUser.access)
  jobVacancyUsers: JobVacancyUser[];
}
