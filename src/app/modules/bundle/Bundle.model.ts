import { model, Schema } from 'mongoose';
import TBundle from './Bundle.interface';
import slugify from 'slugify';

const bundleSchema = new Schema<TBundle>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    banner: {
      type: String,
      required: true,
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
    ],
    buy_price: {
      type: Number,
    },
    rent_price: {
      type: Number,
    },
    stock: {
      type: Number,
      required: true,
    },
    isAvailable: {
      type: Boolean,
    },
    isRentable: {
      type: Boolean,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    additional: {
      type: Map,
      of: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

bundleSchema.pre('validate', function (next) {
  if (this.name) this.slug = slugify(this.name, { lower: true, strict: true });

  next();
});

const Bundle = model<TBundle>('Bundle', bundleSchema);

export default Bundle;
