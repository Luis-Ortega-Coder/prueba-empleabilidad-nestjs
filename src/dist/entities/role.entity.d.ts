import { Access } from './auth.entity';
export declare class Role {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    accesses: Access[];
}
