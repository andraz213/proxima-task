import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {ProductService} from "./product.service";


@Controller('product')
export class ProductController {
    constructor(private readonly appService: ProductService) {}

    @Get(':id')
    getOneProduct(@Param('id') prodId: string): string {
        return this.appService.getHello();
    }

    @Post()
    async postProduct(@Body('name') prodName: string, @Body('price') prodPrice: number, @Body('available') prodAvailable: boolean ){

    }


    @Delete(':id')
    async deleteProduct(@Param('id') prodId: string){

    }

    @Put()
    async updateProduct(@Body('id') prodId: string, @Body('name') prodName: string, @Body('price') prodPrice: number, @Body('available') prodAvailable: boolean ){

    }

}
