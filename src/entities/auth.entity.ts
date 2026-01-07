import { Entity, 
    PrimaryGeneratedColumn,
    Column,
    Index,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn
} from "typeorm";


@Entity('access')
export class Access{
    @PrimaryGeneratedColumn()
    id: number

    @Index({ unique: true })
    @Column({ type: 'varchar', length: 60, unique: true, nullable: false })
    username: string

    @Column({ type: 'varchar', length: 120, nullable: false, select: false })
    password: string

    @JoinColumn({ name: 'compare_password_id', })
    comparePasswordId: number

    @Index({ unique: true })
    @Column({ type: 'varchar', length: 70, unique: true, nullable: false })
    email: string

    @JoinColumn({ name: 'info_user_id' })
    userInfo: number

    @JoinColumn({ name: 'role_id' })
    roleId: number

    @Index({ unique: true })
    @Column({ type: 'varchar', length: 40, nullable: false, unique: true })
    identification: string

    @JoinColumn({ name: 'identification_type_id' })
    identificationTypeId: number

    @Column({ type: 'boolean', nullable: false, default: false })
    isDeleted: boolean

    @JoinColumn({ name: 'device_id' })
    deviceId: number

    @CreateDateColumn({ type: 'timestamptz' , select: false})
    created_at: Date

    @UpdateDateColumn({ type: 'timestamptz', select: false})
    updated_at: Date

    @DeleteDateColumn({ type: 'timestamptz', select: false })
    deleted_at: Date
}