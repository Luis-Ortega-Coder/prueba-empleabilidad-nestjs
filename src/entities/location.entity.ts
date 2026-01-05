// src/locations/entities/location.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { JobVacancy } from './jobVacancy.entity';
import { User } from './user.entity'; // Asumiendo que User existe

@Entity('location')
export class Location {
  @PrimaryGeneratedColumn('increment') // O UUID si prefieres
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  // Relación inversa (Una ubicación tiene muchas vacantes)
  @OneToMany(() => JobVacancy, (job) => job.location)
  jobVacancies: JobVacancy[];
  
  // Relación inversa con User (según tu diagrama User tiene location_id)
  @OneToMany(() => User, (user) => user.location)
  users: User[];
}