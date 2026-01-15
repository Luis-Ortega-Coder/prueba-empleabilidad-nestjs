import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtService } from './jwt.service';
import * as fs from 'fs';

@Module({
  imports: [
    JwtModule.register({
      privateKey: fs.readFileSync('keys/private.pem'),
      publicKey: fs.readFileSync('keys/public.pem'),
      signOptions: {
        algorithm: 'RS256',
      },
    }),
  ],
  providers: [JwtService],
  exports: [JwtService],
})
export class AuthJwtModule {}
