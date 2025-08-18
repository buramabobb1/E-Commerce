/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsDate, IsEnum, IsString } from 'class-validator';
import { UserStatus } from '../enum/user-status.enum';

export class CreateUserDto {
  @IsString()
  readonly firstName: string;

  @IsString()
  readonly lastName: string;

  @IsString()
  readonly userName: string;

  @IsString()
  readonly email: string;

  @IsString()
  readonly password: string;

  @IsDate()
  readonly createdAt: Date;

  @IsDate()
  readonly updatedAt: Date;

  @IsEnum({
    values: UserStatus,
    message: 'Status must be one of the following: ACTIVE, INACTIVE, BANNED',
  })
  readonly status: UserStatus;
}
