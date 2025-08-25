import { IsInt, IsOptional, IsPositive } from 'class-validator';

export class PaginationDto {
  @IsInt()
  @IsOptional()
  @IsPositive()
  limit: number = 5;

  @IsOptional()
  @IsInt()
  @IsPositive()
  page: number = 1;
}
