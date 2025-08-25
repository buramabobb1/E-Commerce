import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator';
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

  @IsOptional()
  @IsDate()
  readonly createdAt: Date;

  @IsOptional()
  @IsDate()
  readonly updatedAt: Date;

  @IsEnum(['ACTIVE', 'INACTIVE', 'BANNED'], {
    message: 'Status must be one of the following: ACTIVE, INACTIVE, BANNED',
  })
  readonly status: UserStatus;
}
