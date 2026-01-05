import { Entity, 
    PrimaryGeneratedColumn,
    Column,
    Index,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn
} from "typeorm";


@Entity('identification_type')
export class IdentificationType{
    @PrimaryGeneratedColumn()
    id: number

    @Index({ unique: true })
    @Column({ type: 'varchar', length: 40, unique: true, nullable: false })
    name: string

    @CreateDateColumn({ type: 'timestamptz' , select: false})
    createdAt: Date

    @UpdateDateColumn({ type: 'timestamptz', select: false})
    updatedAt: Date

    @DeleteDateColumn({ type: 'timestamptz', select: false })
    deletedAt: Date
}