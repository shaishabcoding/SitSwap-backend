import { StatusCodes } from 'http-status-codes';
import ServerError from '../../../errors/ServerError';
import IProductReview from './ProductReview.interface';
import ProductReview from './ProductReview.model';
import Product from '../product/Product.model';

export const ProductReviewService = {
  async modify(reviewData: Partial<IProductReview>) {
    const product = await Product.findById(reviewData.product);

    if (!product)
      throw new ServerError(StatusCodes.NOT_FOUND, 'Product not found.');

    const review = await ProductReview.findOneAndUpdate(
      {
        user: reviewData.user,
        product: reviewData.product,
      },
      {
        $set: reviewData,
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
      },
    );

    if (!review)
      throw new ServerError(
        StatusCodes.BAD_REQUEST,
        'Something went wrong. Try again later.',
      );

    const aggregateResult = await ProductReview.aggregate([
      { $match: { product: reviewData.product } },
      {
        $group: {
          _id: '$product',
          avgRating: { $avg: '$rating' },
        },
      },
    ]);

    if (aggregateResult.length > 0)
      await Product.findByIdAndUpdate(reviewData.product, {
        $set: { rating: Math.round(aggregateResult[0].avgRating * 2) / 2 },
      });

    return review;
  },

  async delete({ user, product }: Partial<IProductReview>) {
    const deletedReview = await ProductReview.findOneAndDelete({
      user,
      product,
    });

    if (!deletedReview) return;

    const aggregateResult = await ProductReview.aggregate([
      { $match: { product } },
      {
        $group: {
          _id: '$product',
          avgRating: { $avg: '$rating' },
        },
      },
    ]);

    const newRating =
      aggregateResult.length > 0
        ? Math.round(aggregateResult[0].avgRating * 2) / 2
        : 0;

    await Product.findByIdAndUpdate(product, {
      $set: { rating: newRating },
    });
  },
};
