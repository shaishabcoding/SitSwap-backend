import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import Product from '../product/Product.model';
import Review from './Review.model';
import TReview from './Review.interface';
import Bundle from '../bundle/Bundle.model';

export const ReviewService = {
  async store(reviewData: TReview) {
    const productExists = await Product.exists({ name: reviewData.product });
    const bundleExists = await Bundle.exists({ slug: reviewData.bundle });

    if (!productExists && !bundleExists)
      throw new ApiError(
        StatusCodes.NOT_FOUND,
        'Product not found or Bundle not found',
      );

    const review = await Review.findOneAndUpdate(
      {
        user: reviewData.user,
        product: reviewData.product ?? null, // ? undefined might ignore
        bundle: reviewData.bundle ?? null, // ? --> look above ^^^^^^^
      },
      reviewData,
      { new: true, upsert: true, runValidators: true },
    );

    return review;
  },

  async list(productName: string, query: Record<any, any>) {
    const { page = '1', limit = '10' } = query;
    const skip = (+page - 1) * +limit;

    const reviews = await Review.find({ product: productName })
      .skip(skip)
      .limit(+limit)
      .populate('customer', 'name avatar');

    return reviews;
  },

  async update(reviewId: string, reviewData: TReview) {
    const updatedReview = await Review.findOneAndUpdate(
      { _id: reviewId },
      reviewData,
      { new: true, runValidators: true },
    );

    return updatedReview;
  },

  async delete(reviewId: string) {
    const deletedReview = await Review.findByIdAndDelete(reviewId);

    if (!deletedReview)
      throw new ApiError(StatusCodes.NOT_FOUND, 'Review not found');

    return deletedReview;
  },
};
