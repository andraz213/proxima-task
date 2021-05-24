import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Product} from './product.model';

@Injectable()
export class ProductService {

    constructor(@InjectModel('Product') private readonly productModel: Model<Product>) {}

    async createProduct(name: string, price: number, available: boolean) {
        var prod;
        try {
            prod = new this.productModel({name, price, available});
        }catch(error){
            throw new BadRequestException();
        }
        return await prod.save();
    }

    async getAllProducts(): Promise<Product[]> {
        var products;
        try {
            products = await this.productModel.find().exec();
        }catch(error){
            throw new NotFoundException();
        }

        // reformat output to match the criteria
        return products.map((prod) => ({
            id: prod.id,
            name: prod.name,
            available: prod.available,
            price: prod.price,
            dateCreated: prod.dateCreated,
        }));
    }

    async getOneProduct(prodId: string) {
        let prod;
        try {
            prod = await this.productModel.findById(prodId).exec();
        } catch (error) {
            throw new BadRequestException();
        }

        if (!prod) {
            throw new NotFoundException();
        }

        // reformat output to match the criteria
        return {
            id: prod.id,
            name: prod.name,
            available: prod.available,
            price: prod.price,
            dateCreated: prod.dateCreated,
        };
    }

    async deleteProduct(prodId: string) {
        try {
            await this.productModel.deleteOne({_id: prodId}).exec();
        } catch (error) {
            throw new BadRequestException();
        }
    }

    async updateProduct(
        prodId: string,
        name: string,
        price: number,
        available: boolean,
    ) {
        let prod;
        try {
            prod = await this.productModel.findById(prodId).exec();
        } catch (error) {
            throw new BadRequestException();
        }
        if (!prod) {
            throw new NotFoundException();
        }

        prod.name = name;
        prod.available = available;
        prod.price = price;

        try {
            await prod.save();
        } catch (error) {
            throw new BadRequestException();
        }
    }
}
