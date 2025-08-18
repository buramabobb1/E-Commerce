import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from '../dto/create-product.dto';
import { StockStatus } from '../enum/stock.enum';
import { UpdateProductDto } from '../dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  async createProduct(createProductDto: CreateProductDto) {
    const product = await this.productRepo.save(createProductDto);
    return product;
  }

  async findAllProducts() {
    return this.productRepo.find();
  }

  async findAProduct(id: number) {
    const product = await this.productRepo.findOne({
      where: { id: toString() },
    });

    if (!product) {
      throw new NotFoundException(`product with ${id} not found`);
    }
    return product;
  }

  async findProductById(id: number) {
    const product = await this.productRepo.findOne({
      where: { id: toString() },
    });

    if (!product) {
      throw new NotFoundException(`product with ${id} not found`);
    }
    return product;
  }

  async findProductByName(name: string): Promise<Product> {
    const product = await this.productRepo.findOne({
      where: {
        name,
        stockStatus: StockStatus.IN_STOCK,
      },
    });
    if (!product) {
      throw new NotFoundException(`Product with name ${name} not found`);
    }

    return product;
  }

  async updateProduct(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productRepo.preload({
      id: id.toString(),
      ...updateProductDto,
    });
    if (!product) {
      throw new NotFoundException(`user with ID ${id} not found`);
    }

    return this.productRepo.save(product);
  }

  async removeProduct(id: number) {
    const product = await this.productRepo.findOne({
      where: { id: toString() },
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not available`);
    }
    await this.productRepo.delete(id);
    return `Product with ${id} is successfully deleted`;
  }
}
