// src/jobs/entities/application.entity.ts
import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  CreateDateColumn, 
  UpdateDateColumn, 
  DeleteDateColumn, 
  ManyToOne, 
  JoinColumn,
  Index
} from 'typeorm';
import { User } from './user.entity';
import { JobVacancy } from './jobVacancy.entity';

@Entity('application')
// Restricción: Un usuario no puede aplicar dos veces a la misma vacante (si no está borrada)
@Index(['user', 'jobVacancy'], { unique: true, where: 'deleted_at IS NULL' })
export class Application {

  @PrimaryGeneratedColumn('uuid') // El diagrama solo dice ID, UUID es mejor para transacciones
  id: string;

  // ---------------- RELACIONES (FKs) ----------------

  // FK: user_id (El candidato)
  @ManyToOne(() => User, (user) => user.applications, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'user_id' }) // Acceso directo al ID para evitar JOINS innecesarios
  userId: string;

  // FK: job_vacancy_id
  @ManyToOne(() => JobVacancy, (job) => job.applications, { nullable: false })
  @JoinColumn({ name: 'job_vacancy_id' })
  jobVacancy: JobVacancy;

  @Column({ name: 'job_vacancy_id' })
  jobVacancyId: number;

  // ---------------- CAMPOS DE FECHA ----------------

  // applicate_at TIMESTAMP
  // Nota: Suele ser igual a created_at, pero lo mantengo por el diagrama.
  // Puedes usar @CreateDateColumn() si quieres que sea automático, o @Column tipo timestamp.
  @Column({ name: 'applicate_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  applicateAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}