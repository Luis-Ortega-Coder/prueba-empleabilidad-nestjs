import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Access } from '../entities/auth.entity';

@Injectable()
export class AccessRepository extends Repository<Access> {
  constructor(private readonly dataSource: DataSource) {
    super(Access, dataSource.createEntityManager());
  }

  /**
   * Obtener un Access por ID con relaciones necesarias
   */
  async getAccessById(id: number): Promise<Access | null> {
    return this.createQueryBuilder('access')
      .leftJoinAndSelect('access.role', 'role')
      .leftJoinAndSelect('access.user', 'user')
      .leftJoinAndSelect('access.jobVacancyUsers', 'jvu')
      .where('access.id = :id', { id })
      .getOne();
  }

  /**
   * Listar Access con paginación
   */
  async listAccesses(page = 1, limit = 50): Promise<Access[]> {
    return this.createQueryBuilder('access')
      .leftJoinAndSelect('access.role', 'role')
      .leftJoinAndSelect('access.user', 'user')
      .orderBy('access.id', 'DESC')
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();
  }

  /**
   * Crear un Access de forma segura y rápida
   */
  async createAccess(userId: number, roleId: number): Promise<Access> {
    const access = this.create({
      user: { id: userId },
      role: { id: roleId },
    });
    return this.save(access);
  }


  async updateAccess(id: number, payload: Partial<Access>): Promise<void> {
    await this.createQueryBuilder()
      .update(Access)
      .set(payload)
      .where('id = :id', { id })
      .execute();
  }

  /**
   * Eliminar Access
   */
  async deleteAccess(id: number): Promise<void> {
    await this.createQueryBuilder()
      .delete()
      .from(Access)
      .where('id = :id', { id })
      .execute();
  }
}
