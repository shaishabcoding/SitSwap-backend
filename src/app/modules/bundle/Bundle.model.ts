import { model, Schema } from 'mongoose';
import IBundle from './Bundle.interface';

const bundleSchema = new Schema<IBundle>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    images: {
      type: [String],
      required: true,
      validate: {
        validator: (value: string[]) =>
          Array.isArray(value) && value.length > 0, // ! images is required
        message: 'Images array must not be empty',
      },
    },
    products: { type: [Schema.Types.ObjectId], ref: 'Product', required: true },
    isRentable: { type: Boolean, default: true },
    isAvailable: { type: Boolean, default: true },
    buy_price: { type: Number, required: true },
    rent_price: { type: Number, required: true },
    purchasedCount: { type: Number, default: 0 },
    rating: {
      type: Number,
      required: true,
      default: 5,
      validate: {
        validator: function (value) {
          return value >= 0 && value <= 5 && value % 0.5 === 0;
        },
        message: 'Rating must be between 0 and 5, in increments of 0.5',
      },
    },
    user: {
      type: Schema.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);

const Bundle = model<IBundle>('Bundle', bundleSchema);

export default Bundle;
