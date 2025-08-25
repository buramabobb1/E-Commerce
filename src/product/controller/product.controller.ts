/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ProductService } from '../service/product.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { PaginationDto } from 'src/pagination/pagination.dto';

@Controller('/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/all-products')
  getAllProducts(@Query() paginationDto: PaginationDto) {
    return this.productService.findAllProducts(paginationDto);
  }

  @Post('/add-products')
  createProduct(@Body() createProduct: CreateProductDto) {
    return this.productService.createProduct(createProduct);
  }

  @Get('/get-product-by-id/:id')
  findProductById(@Param('id') id: number) {
    console.log(`${id}`);
    return this.productService.findProductById(id);
  }

  @Get('/find-product-by-name/:name')
  findProductByName(@Param('name') name: string) {
    console.log(`${name}`);
    return this.findProductByName(name);
  }

  @Patch('/update-product/:id')
  updateProduct(
    @Param('id') id: number,
    @Body() updateProduct: UpdateProductDto,
  ) {
    console.log(`Product with ID ${id} is updated`);
    return this.productService.updateProduct(id, updateProduct);
  }

  @Delete('/delete-product/:id')
  deleteProduct(@Param('id') id: number) {
    console.log(`product with ${id} is removed`);
    return this.productService.removeProduct(id);
  }
}
