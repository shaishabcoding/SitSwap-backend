import { Types } from 'mongoose';
import catchAsync from '../../../shared/catchAsync';
import serveResponse from '../../../shared/serveResponse';
import IProductReview from './ProductReview.interface';
import { ProductReviewService } from './ProductReview.service';

export const ProductReviewController = {
  modify: catchAsync(async (req, res) => {
    const reviewData = {
      user: req.user!._id as Types.ObjectId,
      product: new Types.ObjectId(req.params.productId),
    };

    Object.assign(reviewData, req.body);

    await ProductReviewService.modify(reviewData as IProductReview);

    serveResponse(res, {
      message: 'Review modify successfully.',
    });
  }),
};
