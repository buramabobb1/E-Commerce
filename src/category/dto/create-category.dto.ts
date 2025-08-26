import { Type } from 'class-transformer';
import { IsDate, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  readonly createdAt?: Date = new Date();

  @IsOptional()
  @IsDate({})
  @Type(() => Date)
  readonly updatedAt?: Date = new Date();
}
