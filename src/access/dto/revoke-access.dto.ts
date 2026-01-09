import { IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class RevokeAccessDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  accessId: number;
}
