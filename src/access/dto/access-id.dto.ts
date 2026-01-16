import { IsInt, Min, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class AccessIdDto {
  @IsNotEmpty({ message: 'fields required' })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  accessId: number;
}
