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
import { JobVacancyUser } from './application.entity';
import { Location } from './location.entity';

@Entity('job_vacancies')
@Index('IDX_JOB_VACANCY', ['title'], { unique:true })
export class JobVacancy {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'title', type: 'varchar', length: '70' })
  title: string;

  @Column({ name: 'description', type: 'text', nullable: true })
  description: string;

  @Column({ name: 'seniority_level', type: 'varchar', length: 70 })
  seniorityLevel: string;

  @Column({ name: 'work_modality', type: 'varchar', length: 60 })
  workModality: string;

  @Column({ name: 'company', type: 'varchar', length: 60 })
  company: string;

  @Column({ name: 'salary_range', type: 'float' })
  salaryRange: number;

  @Column({ name: 'soft_skills', type: 'varchar', length: 60 })
  softSkills: string;

  @Column({ name: 'max_aplications', type: 'integer' })
  maximumApplications: number;

  @CreateDateColumn({ name: 'created_at', type:'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type:'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type:'timestamptz' })
  deletedAt: Date | null;

  @ManyToOne(() => Location, (location) => location.jobVacancies, {
    nullable: false,
  })
  @JoinColumn({ name: 'location_id' })
  location: Location;

  @OneToMany(
    () => JobVacancyUser,
    (jobVacancyUser) => jobVacancyUser.jobVacancy,
  )
  jobVacancyUsers: JobVacancyUser[];
}
