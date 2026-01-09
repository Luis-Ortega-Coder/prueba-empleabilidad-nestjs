import { IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class AccessIdDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  accessId: number;
}
