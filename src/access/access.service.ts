import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AccessRepository } from './access.repository';
import * as argon2 from 'argon2';

@Injectable()
export class AccessService {
  constructor(
    private readonly accessRepository: AccessRepository,
  ) {}

  /**
   * 🔐 LOGIN (HOT PATH)
   * Esta función se ejecuta millones de veces
   */
  async validateCredentials(
    email: string,
    plainPassword: string,
  ) {
    const access = await this.accessRepository.findForLogin(email);

    if (!access) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordValid = await argon2.verify(
      access.password,
      plainPassword,
    );

    if (!passwordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // ⚠️ Nunca devolver el password
    return {
      id: access.id,
      email: access.email,
    };
  }

  /**
   * ⚡ AUTHORIZATION (GUARDS)
   * Ultra frecuente
   */
  async getAccessContext(accessId: number) {
    const access =
      await this.accessRepository.findWithRoleAndUser(accessId);

    if (!access) {
      throw new UnauthorizedException('Access not found');
    }

    return {
      accessId: access.id,
      email: access.email,
      role: {
        id: access.role.id,
        name: access.role.name,
      },
      user: {
        id: access.user.id,
        firstName: access.user.firstName,
        lastName: access.user.lastName,
      },
    };
  }

  /**
   * 🚀 VALIDACIÓN RÁPIDA (GUARDS MASIVOS)
   * Ideal para endpoints públicos/protegidos
   */
  async isAccessActive(accessId: number): Promise<boolean> {
    return this.accessRepository.existsActiveAccess(accessId);
  }

  /**
   * 📊 Accesos por usuario (uso administrativo)
   */
  async getUserAccesses(
    userId: number,
    limit = 20,
    offset = 0,
  ) {
    return this.accessRepository.findByUserId(
      userId,
      limit,
      offset,
    );
  }

  /**
   * 🗑 Desactivación de acceso (soft delete)
   */
  async revokeAccess(accessId: number): Promise<void> {
    await this.accessRepository.softDeleteById(accessId);
  }
}
