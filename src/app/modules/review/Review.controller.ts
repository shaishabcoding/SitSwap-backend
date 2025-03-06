import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ReviewService } from './Review.service';

export const ReviewController = {
  store: catchAsync(async (req, res) => {
    req.body.user = req.user!._id;
    req.body.bundle = req.params.bundleSlug || undefined;
    req.body.product = req.params.productName || undefined;

    const newReview = await ReviewService.store(req.body);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Review stored successfully.',
      data: newReview,
    });
  }),

  list: catchAsync(async (req, res) => {
    const reviews = await ReviewService.list(req.body, req.query);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Reviews retrieved successfully.',
      data: reviews,
    });
  }),

  update: catchAsync(async (req, res) => {
    const updatedReview = await ReviewService.update(
      req.params.reviewId,
      req.body,
    );

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Review has updated successfully.',
      data: updatedReview,
    });
  }),

  delete: catchAsync(async (req, res) => {
    await ReviewService.delete(req.params.reviewId);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Review has deleted successfully.',
    });
  }),
};
