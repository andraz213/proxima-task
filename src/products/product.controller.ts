import { Controller, Get } from '@nestjs/common';
import {ProductService} from "./product.service";


@Controller('product')
export class ProductController {
    constructor(private readonly appService: ProductService) {}

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }
}
