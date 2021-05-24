import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {ProductService} from "./product.service";
import {Product} from "./product.model";


@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get(':id')
    async getOneProduct(@Param('id') prodId: string){
        return await this.productService.getOneProduct(prodId);
    }

    @Post()
    async postProduct(@Body('name') prodName: string, @Body('price') prodPrice: number, @Body('available') prodAvailable: boolean ){
        const prod =  await this.productService.createProduct(prodName, prodPrice, prodAvailable);

        return prod;
    }


    @Delete(':id')
    async deleteProduct(@Param('id') prodId: string){
        await this.productService.deleteProduct(prodId);

    }

    @Put()
    async updateProduct(@Body('id') prodId: string, @Body('name') prodName: string, @Body('price') prodPrice: number, @Body('available') prodAvailable: boolean ){

    }

}
