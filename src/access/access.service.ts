import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { LoginAccessDto } from './dto/login-access.dto';
import { AccessIdDto } from './dto/access-id.dto';
import { AccessRepository } from './access.repository';
import { JwtPayload } from '../jwt/jwt.types'
import { JwtService } from '../jwt/jwt.service'
import * as argon2 from 'argon2';

@Injectable()
export class AccessService {
  constructor(
    private readonly accessRepository: AccessRepository,
    private readonly authJwtService: JwtService
  ) {}


  async validateCredentials( dtoAccces ) {
    const { email, password } = dtoAccces

    const access = await this.accessRepository.findForLogin(email);

    const passwordHash = access ? access.password : '';

    const passwordValid = await argon2.verify(passwordHash, password);

    if (!access){
      throw new NotFoundException('not found')
    }

    if (!passwordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      id: access.id,
      name: access.user.firstName,
      role: access.role.name
    }       

  }


  async Login(dto: LoginAccessDto){
    const user = await this.validateCredentials(dto);

    const payloadUser: JwtPayload = {
      id: user.id,
      sub: user.name,
      role: user.role
    }
    
    const acccessToken = this.authJwtService.signAccessToken(payloadUser);

    return { acccessToken }

  }

 
  async getAccessContext(dto: AccessIdDto) {
    const { accessId } = dto
    const access = await this.accessRepository.findWithRoleAndUser(accessId);

    if (!access) {
      throw new NotFoundException('Access not found');
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

 
  async isAccessActive(accessId: number): Promise<boolean> {
    return this.accessRepository.existsActiveAccess(accessId);
  }

  
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

 
  async revokeAccess(accessId: number): Promise<void> {
    await this.accessRepository.softDeleteById(accessId);
  }
}
