import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  available: { type: Boolean, required: true },
  dateCreated: { type: Date, default: Date.now },
});

export interface Product {
  id: string;
  name: string;
  price: number;
  available: boolean;
  dateCreated: Date;
}
