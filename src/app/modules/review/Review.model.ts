import { model, Schema } from 'mongoose';
import TReview from './Review.interface';

const reviewSchema = new Schema<TReview>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  product: String, // ? product.name
  bundle: String, // ? bundle.slug
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
    validate: {
      validator: (val: number) => !(val % 0.5),
      message:
        'Rating must be in increments of 0.5 (e.g. 0, 0.5, 1, 1.5, ..., 5)',
    },
  },
  review: {
    type: String,
    trim: true,
    required: true,
  },
});

const Review = model<TReview>('Review', reviewSchema);

export default Review;
