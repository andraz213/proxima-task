import { Controller, Get } from '@nestjs/common';
import {ProductService} from "./product.service";


@Controller('products')
export class ProductsController {
    constructor(private readonly appService: ProductService) {}

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }
}
