import { model, Schema } from 'mongoose';
<<<<<<< HEAD
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
=======
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
    buyPrice: {
      type: Number,
    },
    rentPrice: {
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
>>>>>>> d7c4d194fee26245db6b8497e47d63fc4fd6f703
    },
  },
  {
    timestamps: true,
  },
);

<<<<<<< HEAD
const Bundle = model<IBundle>('Bundle', bundleSchema);
=======
bundleSchema.pre('validate', async function (next) {
  if (this.name) {
    const baseSlug = slugify(this.name, { lower: true, strict: true });
    let newSlug = baseSlug,
      count = 1;

    while (await Bundle.exists({ slug: newSlug }))
      newSlug = `${baseSlug}-${++count}`;

    this.slug = newSlug;
  }

  next();
});

const Bundle = model<TBundle>('Bundle', bundleSchema);
>>>>>>> d7c4d194fee26245db6b8497e47d63fc4fd6f703

export default Bundle;
