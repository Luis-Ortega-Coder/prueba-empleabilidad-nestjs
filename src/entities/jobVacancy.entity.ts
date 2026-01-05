// src/jobs/entities/job-vacancy.entity.ts
import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  CreateDateColumn, 
  UpdateDateColumn, 
  DeleteDateColumn, 
  ManyToOne, 
  OneToMany, 
  JoinColumn 
} from 'typeorm';
import { IsString, IsNotEmpty, IsInt, IsOptional, MaxLength } from 'class-validator';
import { Location } from './location.entity';
import { User } from './user.entity';
import { Application } from './application.entity';

@Entity('job_vacancy')
export class JobVacancy {
  
  // PK: ID INTEGER
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 120 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  title: string;

  @Column({ type: 'text', nullable: true })
  @IsString()
  @IsOptional()
  description: string;

  @Column({ type: 'varchar', length: 255 })
  @IsString()
  @IsNotEmpty()
  technologies: string; // Podría ser un array en el futuro, pero el diagrama dice varchar

  @Column({ type: 'varchar', length: 255 })
  @IsString()
  @IsNotEmpty()
  seniority: string;

  // ---------------- CAMPOS ADICIONALES DEL DIAGRAMA ----------------

  @Column({ name: 'work_modality', type: 'varchar', length: 50, nullable: true })
  @IsOptional()
  workModality: string; // Sugerencia: Usar Enums aquí (Remote, Hybrid, OnSite)

  @Column({ name: 'salary_range', type: 'varchar', length: 100, nullable: true })
  @IsOptional()
  salaryRange: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  @IsOptional()
  currency: string; // Ej: USD, EUR

  @Column({ type: 'varchar', length: 100, nullable: true })
  @IsOptional()
  company: string;

  @Column({ name: 'maximum_quota', type: 'int', nullable: true })
  @IsInt()
  @IsOptional()
  maximumQuota: number;

  // ---------------- RELACIONES ----------------

  // FK: location_id
  @ManyToOne(() => Location, (location) => location.jobVacancies)
  @JoinColumn({ name: 'location_id' })
  location: Location;

  @Column({ name: 'location_id', nullable: true })
  locationId: number;

  // Relación con User (El reclutador que publica)
  // Nota: El diagrama tiene una línea entre User y JobVacancy
  @ManyToOne(() => User, { nullable: true }) 
  @JoinColumn({ name: 'recruiter_id' }) // Nombre sugerido, o user_id
  recruiter: User;

  // Relación inversa con Applications
  @OneToMany(() => Application, (application) => application.jobVacancy)
  applications: Application[];

  // ---------------- TIMESTAMPS ----------------

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}