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
      required: true,
      validate: {
        validator: function (value) {
          return value >= 0 && value <= 5 && value % 0.5 === 0;
        },
        message: 'Rating must be between 0 and 5, in increments of 0.5',
      },
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
