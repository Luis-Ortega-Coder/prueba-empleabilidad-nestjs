import { DataSource } from 'typeorm';
import { BaseRepository } from '../base-repository/base.repository';
import { Access } from '../entities/auth.entity';
export declare class AccessRepository extends BaseRepository<Access> {
    constructor(dataSource: DataSource);
    findForLogin(email: string): Promise<Access | null>;
    findWithRoleAndUser(accessId: number): Promise<Access | null>;
    existsActiveAccess(accessId: number): Promise<boolean>;
    findByUserId(userId: number, limit?: number, offset?: number): Promise<Access[]>;
    softDeleteById(accessId: number): Promise<void>;
}
