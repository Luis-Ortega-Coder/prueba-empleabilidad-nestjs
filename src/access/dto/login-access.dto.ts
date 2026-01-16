import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class LoginAccessDto {
  @IsNotEmpty({ message: 'required field' })
  @IsEmail({}, { message: 'Invalid email' })
  @Transform(({ value }) => value.trim().toLowerCase())
  @Length(5, 60)
  email: string;

  @IsNotEmpty({ message: 'required field' })
  @IsStrongPassword({
    minSymbols: 1,
    minLength: 9,
    minNumbers: 2,
    minUppercase: 2
  },
  { message: 'Vulnerable passwords' })
  @Length(9, 92)
  password: string;
}
