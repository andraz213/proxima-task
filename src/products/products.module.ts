import { Module } from '@nestjs/common';
import {ProductController} from "./product.controller";
import {ProductsController} from "./products.controller";
import {ProductService} from "./product.service";

@Module({
    imports: [],
    controllers: [ProductController, ProductsController],
    providers: [ProductService],
})
export class ProductModule {}
