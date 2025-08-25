import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    if (createProductDto.name) {
      const productNameExist = await this.productRepo.findOne({
        where: { name: createProductDto.name },
      });
      if (productNameExist) {
        throw new ConflictException(`${createProductDto.name} already exist`);
      }
    }

    if (createProductDto.price) {
      const productPriceExist = await this.productRepo.findOne({
        where: { price: createProductDto.price },
      });
      if (productPriceExist) {
        throw new ConflictException(`${createProductDto.price} already exist`);
      }
    }

    if (createProductDto.description) {
      const theSameDescription = await this.productRepo.findOne({
        where: { description: createProductDto.description },
      });
      if (theSameDescription) {
        throw new ConflictException(
          `Product ${createProductDto.description} cannot have the same description with an existing product`,
        );
      }
    }

    const product = this.productRepo.create({
      ...createProductDto,
      stockStatus: StockStatus.IN_STOCK,
    });
    return this.productRepo.save(product);
  }

  async findAllProducts() {
    return this.productRepo.find();
  }

  /*async findAProduct(id: number) {
    const productId = await this.productRepo.findOne({ where: { id } });

    if (!productId) {
      throw new NotFoundException(`product with ${id} not found`);
    }
    return productId;
  }*/

  async findProductById(id: number) {
    const product = await this.productRepo.findOne({
      where: { id },
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
      id,
      ...updateProductDto,
    });
    if (!product) {
      throw new NotFoundException(`user with ID ${id} not found`);
    }

    return this.productRepo.save(product);
  }

  async removeProduct(id: number) {
    const product = await this.productRepo.findOne({
      where: { id },
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not available`);
    }
    await this.productRepo.delete(id);
    return `Product with ${id} is successfully deleted`;
  }
}
