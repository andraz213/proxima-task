import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './product.model';

@Injectable()
export class ProductService {
  getHello(): string {
    return 'Hello World!';
  }
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async createProduct(name: string, price: number, available: boolean) {
    const prod = new this.productModel({ name, price, available });
    return await prod.save();
  }

  async getAllProducts(): Promise<Product[]> {
    const products = await this.productModel.find().exec();
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
      throw new NotFoundException();
    }
    if (!prod) {
      throw new NotFoundException();
    }

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
      await this.productModel.deleteOne({ _id: prodId }).exec();
    } catch (error) {
      throw new NotFoundException();
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
      throw new NotFoundException();
    }
    if (!prod) {
      throw new NotFoundException();
    }

    if (name) {
      prod.name = name;
    }

    if (available !== null) {
      prod.available = available;
    }

    if (price) {
      prod.price = price;
    }

    try {
      prod.save();
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
