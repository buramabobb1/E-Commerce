import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { PaginationDto } from 'src/pagination/pagination.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    if (createCategoryDto.name) {
      const categoryNameExist = await this.categoryRepo.findOne({
        where: { name: createCategoryDto.name },
      });

      if (categoryNameExist) {
        throw new ConflictException(`${createCategoryDto.name} already exist`);
      }
    }
    const category = this.categoryRepo.create(createCategoryDto);
    return this.categoryRepo.save(category);
  }

  findAll(pagination: PaginationDto) {
    const { page, limit } = pagination;
    const skip = (page - 1) * limit;

    return this.categoryRepo.find({
      skip,
      take: limit,
    });
  }

  async findOne(id: number) {
    const category = await this.categoryRepo.findOneBy({ id });
    if (!category) {
      throw new NotFoundException(`Category with id ${id} is not found`);
    }
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepo.preload({
      id,
      ...updateCategoryDto,
    });

    if (!id) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    return category;
  }

  async remove(id: number) {
    const cat = await this.categoryRepo.findOne({ where: { id } });

    if (!cat) {
      throw new NotFoundException(`${id} not found`);
    }

    return this.categoryRepo.remove(cat);
  }
}
