// src/access-control/entities/role-resources-access.entity.ts
import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  CreateDateColumn, 
  UpdateDateColumn, 
  DeleteDateColumn, 
  ManyToOne, 
  JoinColumn 
} from 'typeorm';

// Asumo que estas entidades existen en tu proyecto, las importamos aquí
import { Role } from './role.entity';
import { Resource } from './resources.entity';
import { AccessLevel } from './accesLevel.entity';

@Entity('role_resources_access')
export class RoleResourcesAccess {
  
  // PK: ID UUID NOT NULL
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // ---------------- RELACIONES (FKs) ----------------

  // FK: role_id
  @ManyToOne(() => Role, (role) => role.roleResourcesAccess, { nullable: false })
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @Column({ name: 'role_id' })
  roleId: string;


  @ManyToOne(() => Resource, { nullable: false })
  @JoinColumn({ name: 'resource_id' })
  resource: Resource;

  @Column({ name: 'resource_id' })
  resourceId: string;

  // FK: access_lavel_id (Nota: Mantenemos el nombre de tu diagrama, aunque parece typo de 'level')
  @ManyToOne(() => AccessLevel, { nullable: false })
  @JoinColumn({ name: 'access_lavel_id' }) 
  accessLevel: AccessLevel;

  @Column({ name: 'access_lavel_id' })
  accessLevelId: string;

  // ---------------- FLAGS & AUDITORIA ----------------

  // id_deleted BOOLEAN DEFAULT "F"
  // Nota: Tienes deleted_at abajo. Usualmente esto es redundante, 
  // pero lo agrego para cumplir con el diagrama.
  @Column({ name: 'id_deleted', type: 'boolean', default: false })
  isDeleted: boolean;

  // created_at TIMESTAMP
  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  // updated_at TIMESTAMP
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  // deleted_at TIMESTAMP (Soft Delete nativo de TypeORM)
  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt: Date;

  // ---------------- CAMPOS DE TRAZABILIDAD (Usuario) ----------------
  
  // Estos campos no se llenan solos automáticamente por TypeORM (a menos que uses un Subscriber).
  // Se deben llenar manualmente desde el servicio o con un interceptor.

  @Column({ name: 'created_by', type: 'varchar', length: 60, nullable: true })
  createdBy: string;

  @Column({ name: 'updated_by', type: 'varchar', length: 60, nullable: true })
  updatedBy: string;

  @Column({ name: 'deleted_by', type: 'varchar', length: 60, nullable: true })
  deletedBy: string;
}