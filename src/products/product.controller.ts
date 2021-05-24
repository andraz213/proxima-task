import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.model';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get(':id')
  async getOneProduct(@Param('id') prodId: string) {
    return await this.productService.getOneProduct(prodId);
  }

  @Post()
  async postProduct(@Body() prodDTO: Product) {
    let prod;
    try {
      prod = await this.productService.createProduct(
        prodDTO.name,
        prodDTO.price,
        prodDTO.available,
      );
    } catch (e) {
      throw new BadRequestException();
    }
    return prod;
  }

  @Delete(':id')
  async deleteProduct(@Param('id') prodId: string) {
    await this.productService.deleteProduct(prodId);
  }

  @Put()
  async updateProduct(@Body() prodDTO: Product) {
    try {
      await this.productService.updateProduct(
        prodDTO.id,
        prodDTO.name,
        prodDTO.price,
        prodDTO.available,
      );
    } catch (e) {
      throw new BadRequestException();
    }
  }
}
