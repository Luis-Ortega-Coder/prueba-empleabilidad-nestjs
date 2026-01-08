import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Index,
} from 'typeorm';
import { JobVacancy } from './jobVacancy.entity';
import { Access } from './auth.entity';

@Entity('job_vacancy_users')
@Index(['jobVacancy', 'access'], { unique: true })
export class JobVacancyUser {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @ManyToOne(() => JobVacancy, (jobVacancy) => jobVacancy.jobVacancyUsers, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'job_vacancy_id' })
  jobVacancy: JobVacancy;

  @ManyToOne(() => Access, (access) => access.jobVacancyUsers, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'access_id' })
  access: Access;
}
