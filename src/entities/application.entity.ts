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
@Index('IDX_JOB_VACANCY_USERS', ['jobVacancy', 'access'], { unique: true })
export class JobVacancyUser {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz'})
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz'})
  deletedAt: Date | null;

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
