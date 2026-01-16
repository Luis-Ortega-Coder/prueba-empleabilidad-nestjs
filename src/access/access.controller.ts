import { Controller, Post, Body } from '@nestjs/common';
import { LoginAccessDto } from './dto/login-access.dto';
import { AccessService } from './access.service';

@Controller('auth')
export class AcceessController {
  constructor(private readonly accessService: AccessService) {}

  @Post('login')
  async login(@Body() dto: LoginAccessDto) {
    return await this.accessService.Login(dto);
  }
}
