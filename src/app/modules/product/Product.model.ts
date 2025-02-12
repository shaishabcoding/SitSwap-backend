import { Schema, model } from 'mongoose';
import IProduct from './Product.interface';

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    room_type: { type: String, required: true },
    item_type: { type: String, required: true },
    color: { type: String, required: true },
    size: { type: String, required: true },
    material: { type: String, required: true },
    buy_price: { type: Number, required: true },
    rent_price: { type: Number, required: true },
    stock: { type: Number, required: true },
    images: {
      type: [String],
      required: true,
      validate: {
        validator: (value: string[]) =>
          Array.isArray(value) && value.length > 0, // ! images is required
        message: 'Images array must not be empty',
      },
    },
    description: { type: String, required: true },
    dimension: { type: Map, of: String, required: true },
    specifications: { type: [String], required: true },
    isAvailable: { type: Boolean, required: true },
    isRentable: { type: Boolean, required: true },
    user: {
      type: Schema.ObjectId,
      required: true,
      ref: 'User',
    },
    rating: {
      type: Number,
      required: true,
      default: 5,
      validate: {
        validator: function (value) {
          return value >= 0.5 && value <= 5 && value % 0.5 === 0;
        },
        message: 'Rating must be between 0.5 and 5, in increments of 0.5',
      },
    },
  },
  {
    timestamps: true,
  },
);

const Product = model<IProduct>('Product', productSchema);

export default Product;
