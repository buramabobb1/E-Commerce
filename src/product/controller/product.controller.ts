import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';

@Controller('/product')
export class ProductController {
  @Get('/all-products')
  getAllProducts() {
    return { message: 'Product details' };
  }

  @Post()
  createProduct() {
    return { message: 'Product created successfully' };
  }

  @Patch()
  updateProduct() {
    return { message: 'Product updated successfully' };
  }

  @Delete()
  deleteProduct() {
    return { message: 'Product deleted successfully' };
  }
}
