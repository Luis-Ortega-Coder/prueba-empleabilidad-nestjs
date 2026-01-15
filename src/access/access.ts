import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { BaseRepository } from '../base-repository/base.repository';
import { Access } from '../entities/auth.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginAccessDto } from './dto/login-access.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { AccessIdDto } from './dto/access-id.dto';
import { IsNull } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AccessService {
  constructor(
    @InjectRepository(Access)
    private readonly accessRepository: BaseRepository<Access>,
  ) {}

  /**
   * 🔐 LOGIN - recibe DTO
   */
  async login(dto: LoginAccessDto): Promise<Partial<Access>> {
    const { email, password } = dto;

    // Query mínima: buscar por email
    const access = await this.accessRepository.findOne({ where: { email, deletedAt: IsNull()} });

    const passwordHash = access ? access.password : '';

    const passwordValid = await bcrypt.compare(password, passwordHash);

    if (!access || !passwordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      id: access.id,
      email: access.email,
      role: access.role,
    };
  }

  /**
   * ✅ VALIDAR SI UN ACCESS ESTÁ ACTIVO - recibe DTO
   */
  async isAccessActive(dto: AccessIdDto): Promise<boolean> {
    const { accessId } = dto;

    const access = await this.accessRepository.findOne({
      where: { id: accessId, deletedAt: IsNull() },
      select: ['id'],
    });

    return !!access;
  }

  /**
   * 📊 LISTAR ACCESOS DE UN USUARIO - recibe paginación DTO
   */
  async getUserAccesses(
    userId: number,
    paginationDto: PaginationDto,
  ): Promise<Access[]> {
    const { offset, limit } = paginationDto;

    return this.accessRepository.find({
      where: { user: { id: userId }, deletedAt: IsNull() },
      take: limit,
      skip: offset,
      order: { createdAt: 'DESC' },
    });
  }

  /**
   * 🗑 REVOCAR ACCESO (SOFT DELETE) - recibe DTO
   */
  async revokeAccess(dto: AccessIdDto): Promise<void> {
    const { accessId } = dto;

    const access = await this.accessRepository.findOne({
      where: { id: accessId, deletedAt: IsNull() },
    });

    if (!access) {
      throw new NotFoundException('Access not found');
    }

    access.deletedAt = new Date();
    await this.accessRepository.save(access);
  }

  /**
   * ⚡ Obtener contexto mínimo de Access (para JWT guard / me)
   */
  async getAccessContext(dto: AccessIdDto): Promise<Partial<Access>> {
    const { accessId } = dto;

    const access = await this.accessRepository.findOne({
      where: { id: accessId, deletedAt: IsNull() },
      select: ['id', 'email', 'role', 'user'],
    });

    if (!access) {
      throw new NotFoundException('Access not found');
    }

    return access;
  }
}
