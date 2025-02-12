import { model, Schema } from 'mongoose';
import IProductReview from './ProductReview.interface';

const productReviewSchema = new Schema<IProductReview>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    rating: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
      required: true,
    },
    review: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const ProductReview = model<IProductReview>(
  'ProductReview',
  productReviewSchema,
);

export default ProductReview;
