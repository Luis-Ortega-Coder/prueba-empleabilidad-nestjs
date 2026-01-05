import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  CreateDateColumn, 
  UpdateDateColumn, 
  DeleteDateColumn, 
  Index 
} from 'typeorm';
import { IsString, MaxLength, IsOptional, IsNotEmpty } from 'class-validator';

@Entity('resources') // Cambia esto por el nombre real de tu tabla (ej: 'roles')
// IMPORTANTE: Solución para que el UNIQUE funcione con Soft Delete
@Index('IDX_name_unique_active', ['name'], { where: 'deleted_at IS NULL', unique: true })
export class Resource {

  // ID UUID NOT NULL
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // name VARCHAR(80) NOT NULL UNIQUE
  @Column({ type: 'varchar', length: 80 }) // Quitamos unique: true de aquí por el Index de arriba
  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  name: string;

  // description TEXT
  @Column({ type: 'text', nullable: true })
  @IsString()
  @IsOptional()
  description: string;

  // ---------------- FLAGS & AUDITORIA ----------------

  // is_deleted BOOLEAN DEFAULT "F"
  // Nota: Redundante con deleted_at, pero incluido por fidelidad al XML
  @Column({ name: 'is_deleted', type: 'boolean', default: false })
  isDeleted: boolean;

  // created_at TIMESTAMP
  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  // updated_at TIMESTAMP
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  // deleted_at TIMESTAMP
  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt: Date;

  // ---------------- CAMPOS DE TRAZABILIDAD (Usuario) ----------------

  // created_by VARCHAR(60)
  @Column({ name: 'created_by', type: 'varchar', length: 60, nullable: true })
  createdBy: string;

  // updated_by VARCHAR(60)
  @Column({ name: 'updated_by', type: 'varchar', length: 60, nullable: true })
  updatedBy: string;

  // Nota: El XML no traía deleted_by, pero suele ir en conjunto
}