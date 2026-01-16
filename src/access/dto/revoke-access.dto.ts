import { IsInt, IsNotEmpty, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class RevokeAccessDto {
  @IsNotEmpty({ message: 'required field' })
  @Type(() => Number)
  @IsInt({ message: 'the field must be an integer' })
  @Min(1)
  accessId: number;
}
