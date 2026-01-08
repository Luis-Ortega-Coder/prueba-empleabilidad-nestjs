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
} from 'typeorm';
import { JobVacancyUser } from './application.entity';
import { Location } from './location.entity';

@Entity('job_vacancies')
export class JobVacancy {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  seniorityLevel: string;

  @Column()
  workModality: string;

  @Column()
  company: string;

  @Column()
  salaryRange: number;

  @Column()
  softSkills: string;

  @Column()
  maximumApplications: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

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
