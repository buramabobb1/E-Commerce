/* eslint-disable @typescript-eslint/no-unsafe-call */
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

  @IsEnum({
    values: StockStatus,
    message:
      'Stock status must be one of the following: IN_STOCK, OUT_OF_STOCK, PRE_ORDER',
  })
  readonly stock: StockStatus;

  @IsDate({
    message: 'Created at must be a valid date',
  })
  @Type(() => Date)
  readonly createdAt: Date;

  @IsDate({
    message: 'Updated at must be a valid date',
  })
  @Type(() => Date)
  readonly updatedAt: Date;

  @IsDate({
    message: 'Deleted at must be a valid date',
  })
  @Type(() => Date)
  @IsOptional()
  readonly deletedAt?: Date;
}
