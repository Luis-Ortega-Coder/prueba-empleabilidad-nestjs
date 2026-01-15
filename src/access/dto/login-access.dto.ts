import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class LoginAccessDto {
  @IsEmail({}, { message: 'Invalid email' })
  @Transform(({ value }) => value.trim().toLowerCase())
  @Length(5, 60)
  @IsNotEmpty({ message: 'required field' })
  email: string;

  @IsString()
  @IsStrongPassword({
    minSymbols: 1,
    minLength: 9,
    minNumbers: 2,
    minUppercase: 2
  },
  { message: 'Vulnerable passwords' })
  @IsNotEmpty({ message: 'required field' })
  @Length(9, 92)
  password: string;
}
