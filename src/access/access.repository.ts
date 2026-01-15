import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from '../base-repository/base.repository';
import { Access } from '../entities/auth.entity';

@Injectable()
export class AccessRepository extends BaseRepository<Access> {
  constructor(dataSource: DataSource) {
    super(dataSource, Access);
  }


  async findForLogin(email: string): Promise<Access | null> {
    return this.createQueryBuilder('access')
      .select([
        'access.id',
        'access.email',
        'access.password',
      ])
      .where('access.email = :email', { email })
      .andWhere('access.deleted_at IS NULL')
      .limit(1)
      .getOne();
  }

 
  async findWithRoleAndUser(accessId: number): Promise<Access | null> {
    return this.createQueryBuilder('access')
      .select([
        'access.id',
        'access.email',
        'role.id',
        'role.name',
        'user.id',
        'user.firstName',
        'user.lastName',
      ])
      .innerJoin('access.role', 'role')
      .innerJoin('access.user', 'user')
      .where('access.id = :id', { id: accessId })
      .andWhere('access.deleted_at IS NULL')
      .limit(1)
      .getOne();
  }


  async existsActiveAccess(accessId: number): Promise<boolean> {
    const result = await this.createQueryBuilder('access')
      .select('1')
      .where('access.id = :id', { id: accessId })
      .andWhere('access.deleted_at IS NULL')
      .limit(1)
      .getRawOne();

    return !!result;
  }

 
  async findByUserId(
    userId: number,
    limit = 20,
    offset = 0,
  ): Promise<Access[]> {
    return this.createQueryBuilder('access')
      .select([
        'access.id',
        'access.email',
        'access.createdAt',
      ])
      .where('access.user_id = :userId', { userId })
      .andWhere('access.deleted_at IS NULL')
      .orderBy('access.created_at', 'DESC')
      .limit(limit)
      .offset(offset)
      .getMany();
  }


  async softDeleteById(accessId: number): Promise<void> {
    await this.createQueryBuilder()
      .update(Access)
      .set({ deletedAt: () => 'NOW()' })
      .where('id = :id', { id: accessId })
      .andWhere('deleted_at IS NULL')
      .execute();
  }
}
