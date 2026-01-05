// src/access-levels/entities/access-level.entity.ts
import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  CreateDateColumn, 
  UpdateDateColumn, 
  DeleteDateColumn, 
  Index 
} from 'typeorm';
import { IsString, IsNotEmpty, MaxLength, IsOptional, IsBoolean } from 'class-validator';

@Entity('access_level')
// IMPORTANTE: Índice único condicional.
// Permite crear un access_level con el mismo nombre SOLO si el anterior tiene deleted_at (está borrado).
@Index('IDX_access_level_name_unique', ['name'], { where: 'deleted_at IS NULL', unique: true })
export class AccessLevel {

  // PK: ID UUID NOT NULL
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // name VARCHAR(80) NOT NULL UNIQUE
  @Column({ type: 'varchar', length: 80 }) 
  // Nota: No ponemos unique: true aquí para evitar conflicto con soft-delete, usamos el Index de arriba
  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  name: string;

  // description TEXT
  @Column({ type: 'text', nullable: true })
  @IsString()
  @IsOptional()
  description: string;

  // is_deleted BOOLEAN DEFAULT "F"
  // Nota: Mantenemos este campo por fidelidad a tu diagrama, 
  // aunque TypeORM usa internamente deleted_at para la lógica.
  @Column({ name: 'is_deleted', type: 'boolean', default: false })
  @IsBoolean()
  @IsOptional()
  isDeleted: boolean;

  // ---------------- TIMESTAMPS (Auditoría Automática) ----------------

  // created_at TIMESTAMP
  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  // updated_at TIMESTAMP
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  // deleted_at TIMESTAMP (Soft Delete)
  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt: Date;

  // ---------------- USER AUDIT (Auditoría Manual) ----------------
  
  // Recuerda: Estos campos debes llenarlos tú desde el servicio 
  // tomando el usuario del request (JWT).

  // created_by VARCHAR(60)
  @Column({ name: 'created_by', type: 'varchar', length: 60, nullable: true })
  createdBy: string;

  // updated_by VARCHAR(60)
  @Column({ name: 'updated_by', type: 'varchar', length: 60, nullable: true })
  updatedBy: string;

  // deleted_by VARCHAR(60)
  @Column({ name: 'deleted_by', type: 'varchar', length: 60, nullable: true })
  deletedBy: string;
}