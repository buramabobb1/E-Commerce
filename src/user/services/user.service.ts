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
import { PaginationDto } from 'src/pagination/pagination.dto';

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
    }

    const user = this.userRepository.create({
      ...createUserDto,
      status: UserStatus.PENDING,
    });

    return await this.userRepository.save(user);
  }

  async findAll(PaginationDto: PaginationDto) {
    const { page, limit } = PaginationDto;
    const skip = (page - 1) * limit;
    return await this.userRepository.find({
      skip,
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
  async findUserByEmail(email: string) {
    const userWithEmail = await this.userRepository.findOne({
      where: { email },
    });

    if (!email) {
      throw new NotFoundException(`${email} does not exist`);
    }
    return userWithEmail;
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
