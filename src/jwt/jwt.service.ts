import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt.types';

@Injectable()
export class JwtService {
  constructor(private readonly jwt: NestJwtService) {}

  signAccessToken(payload: JwtPayload): string {
    return this.jwt.sign(
      {
        id: payload.id,
        sub: payload.sub,
        role: payload.role,
      },
      {
        algorithm: 'RS256',
        expiresIn: '10m',
      },
    );
  }

  verifyAccessToken(token: string): JwtPayload {
    try {
      return this.jwt.verify<JwtPayload>(token, {
        algorithms: ['RS256'],
      });
    } catch {
      throw new UnauthorizedException('invalid token');
    }
  }
}
