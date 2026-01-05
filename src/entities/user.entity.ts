// src/users/entities/user.entity.ts
import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  ManyToOne,
  OneToMany, 
  OneToOne, 
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn
} from 'typeorm';
import { IsString, IsNotEmpty, MaxLength, IsOptional, IsUrl, Matches } from 'class-validator';
import { Location } from './location.entity';
// Asumo que la entidad de la derecha se llama Access (por el contexto anterior)
import { Access } from './auth.entity';
import { Application } from './application.entity'; 

@Entity('user')
export class User {

  // PK: ID UUID NOT NULL
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // name VARCHAR(50) NOT NULL
  @Column({ type: 'varchar', length: 50 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  // middle_name VARCHAR(50) (En el diagrama no dice NOT NULL, asumo opcional)
  @Column({ name: 'middle_name', type: 'varchar', length: 50, nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(50)
  middleName: string;

  // last_name VARCHAR(50) NOT NULL
  @Column({ name: 'last_name', type: 'varchar', length: 50 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  lastName: string;

  // second_last_name VARCHAR(50) NOT NULL
  @Column({ name: 'second_last_name', type: 'varchar', length: 50 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  secondLastName: string;

  // phone VARCHAR(13) NOT NULL
  @Column({ type: 'varchar', length: 13 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(13)
  // Opcional: Regex para validar teléfonos (ej: solo números y +)
  @Matches(/^\+?[0-9]*$/, { message: 'El teléfono debe contener solo números' })
  phone: string;

  // avatar_url TEXT
  @Column({ name: 'avatar_url', type: 'text', nullable: true })
  @IsString()
  @IsOptional()
  @IsUrl({}, { message: 'Debe ser una URL válida' }) // Validación muy útil aquí
  avatarUrl: string;

  // ---------------- RELACIONES ----------------

  // FK: location_id (Relación con Location)
  @ManyToOne(() => Location, (location) => location.users)
  @JoinColumn({ name: 'location_id' })
  location: Location;

  @Column({ name: 'location_id', nullable: true })
  locationId: number;

  // Relación con ACCESS (Tabla de la derecha)
  // Según el diagrama, la tabla 'access' tiene 'info_user_id'.
  // Esto significa que Access es el "dueño" de la FK, y User es la parte inversa.
  @OneToOne(() => Access, (access) => access.userInfo) 
  access: Access;

  @OneToMany(() => Application, (application) => application.user)
    applications: Application[];

  // ---------------- TIMESTAMPS ----------------
  // Aunque no salen en este cuadro específico del diagrama, 
  // SIEMPRE deberías tenerlos en la entidad User para auditoría.
  
  @CreateDateColumn({ name: 'created_at', select: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', select: false })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', select: false })
  deletedAt: Date;
}