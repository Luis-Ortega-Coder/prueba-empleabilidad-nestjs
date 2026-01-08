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
} from 'typeorm';
import { Role } from './role.entity';
import { User } from './user.entity';
import { JobVacancyUser } from './application.entity';

@Entity('access')
export class Access {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @ManyToOne(() => Role, (role) => role.accesses, { nullable: false })
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @ManyToOne(() => User, (user) => user.accesses, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => JobVacancyUser, (jobVacancyUser) => jobVacancyUser.access)
  jobVacancyUsers: JobVacancyUser[];
}
