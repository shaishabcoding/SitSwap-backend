import IProductReview from './ProductReview.interface';
import ProductReview from './ProductReview.model';

export const ProductReviewService = {
  async modify(reviewData: Partial<IProductReview>) {
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

    return review;
  },
};
