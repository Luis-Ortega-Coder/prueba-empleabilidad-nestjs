import { Entity, 
    PrimaryGeneratedColumn,
    Column,
    Index,
    JoinColumn,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn
} from "typeorm";
import { RoleResourcesAccess } from "./roleResourcesAccess.entity"


@Entity('role')
export class Role{
    @PrimaryGeneratedColumn()
    id: number

    @Index({ unique: true })
    @Column({ name: 'codename', type: 'varchar', length: 40, unique: true, nullable: false })
    codeName: string

    @Index({ unique: true })
    @Column({ type: 'varchar', length: 50, nullable: false, unique: true})
    name: string

    @JoinColumn({ name: 'status_id', })
    statusId: number

    @Column({ type: 'boolean', nullable: false, default: false })
    isDeleted: boolean

    @OneToMany(() => RoleResourcesAccess, (access) => access.role)
        roleResourcesAccess: RoleResourcesAccess[];

    @CreateDateColumn({ type: 'timestamptz' , select: false})
    created_at: Date

    @UpdateDateColumn({ type: 'timestamptz', select: false})
    updated_at: Date

    @DeleteDateColumn({ type: 'timestamptz', select: false })
    deleted_at: Date
}