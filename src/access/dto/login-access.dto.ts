import {
  IsEmail,
  IsString,
  Length,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class LoginAccessDto {
  @IsEmail({}, { message: 'Invalid email' })
  @Transform(({ value }) => value.trim().toLowerCase())
  @Length(5, 60)
  email: string;

  @IsString()
  @Length(8, 72)
  password: string;
}
