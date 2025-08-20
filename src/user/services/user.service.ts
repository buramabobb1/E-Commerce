/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserStatus } from '../enum/user-status.enum';
import { PaginationDto } from '../dto/pagination.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    if (createUserDto.email) {
      const existingUserWithEmail = await this.userRepository.findOne({
        where: { email: createUserDto.email },
      });

      if (existingUserWithEmail) {
        throw new ConflictException(
          `User with ${createUserDto.email} already exist`,
        );
      }

      if (!existingUserWithEmail) {
        throw new NotFoundException(
          `user with ${createUserDto.email} not found`,
        );
      }

      if (createUserDto.userName) {
        const existingUserName = await this.userRepository.findOne({
          where: { userName: createUserDto.userName },
        });

        if (existingUserName) {
          throw new ConflictException(
            `user with username ${createUserDto.userName} already exist`,
          );
        }

        if (!existingUserName) {
          throw new NotFoundException(
            `user with username ${createUserDto.userName} not found`,
          );
        }
      }

      const user = this.userRepository.create({
        ...createUserDto,
        status: UserStatus.PENDING,
      });

      return await this.userRepository.save(user);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { offset, limit } = paginationDto;
    return await this.userRepository.find({
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: number) {
    const userWithId = await this.userRepository.findOne({ where: { id } });

    if (!userWithId) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return userWithId;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.preload({ id, ...updateUserDto });
    if (!user) {
      throw new NotFoundException(`user with ID ${id} not found`);
    }

    return this.userRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with ${id} not found`);
    }
    await this.userRepository.delete(id);
    return `User with ${id} successfully deleted`;
  }
}
