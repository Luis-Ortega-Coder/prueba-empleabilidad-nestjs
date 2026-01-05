import { Entity, 
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn
} from "typeorm";


@Entity('compare_password')
export class ComparePassword{
    @PrimaryGeneratedColumn()
    id: number

    @Column({ name: '1_password', type: 'varchar', length: 120, nullable: false, select: false })
    password1: string

    @Column({ name: '2_password', type: 'varchar', length: 120, nullable: false, select: false })
    password2: string

    @Column({ name: '3_password', type: 'varchar', length: 120, nullable: false, select: false })
    password3: string

    @Column({ name: 'last_int', type: 'integer', length: 1, nullable: false })
    lastInt: number

    @CreateDateColumn({ type: 'timestamptz' , select: false})
    createdAt: Date

    @UpdateDateColumn({ type: 'timestamptz', select: false})
    updatedAt: Date

    @DeleteDateColumn({ type: 'timestamptz', select: false })
    deletedAt: Date
}