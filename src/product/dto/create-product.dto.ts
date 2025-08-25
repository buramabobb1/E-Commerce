import {
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { StockStatus } from '../enum/stock.enum';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @IsString()
  readonly name: string;

  @IsNumber()
  readonly price: number;

  @IsString()
  readonly description: string;

  @IsString()
  readonly category: string;

  @IsEnum(['IN_STOCK', 'OUT_OF_STOCK', 'PRE_ORDER'], {
    message:
      'Stock status must be one of the following: IN_STOCK, OUT_OF_STOCK, PRE_ORDER',
  })
  readonly stock?: StockStatus;

  @IsOptional()
  @IsDate({
    message: 'Created at must be a valid date',
  })
  @Type(() => Date)
  readonly createdAt?: Date;

  @IsOptional()
  @IsDate({
    message: 'Updated at must be a valid date',
  })
  @Type(() => Date)
  readonly updatedAt?: Date;
}
