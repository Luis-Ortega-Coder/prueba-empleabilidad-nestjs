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


@Entity('access_level')
@Index({ unique: true })
export class AccessLevel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name',type: 'varchar', length: 80 }) 
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ name: 'is_deleted', type: 'boolean', default: false })
  isDeleted: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt: Date;

  @Column({ name: 'created_by', type: 'varchar', length: 60, nullable: true })
  createdBy: string;

  @Column({ name: 'updated_by', type: 'varchar', length: 60, nullable: true })
  updatedBy: string;


  @Column({ name: 'deleted_by', type: 'varchar', length: 60, nullable: true })
  deletedBy: string;
}