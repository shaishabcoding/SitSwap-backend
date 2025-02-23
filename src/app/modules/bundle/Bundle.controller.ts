import { StatusCodes } from 'http-status-codes';
import catchAsync, { catchAsyncWithCallback } from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { BundleService } from './Bundle.service';
import { imagesUploadRollback } from '../../middlewares/imageUploader';

export const BundleController = {
  create: catchAsyncWithCallback(async (req, res) => {
    const bundle = await BundleService.create(req.body);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: 'Bundle created successfully.',
      data: bundle,
    });
  }, imagesUploadRollback),

  update: catchAsyncWithCallback(async (req, res) => {
    const updatedBundle = await BundleService.update(
      req.params.bundleId,
      req.body,
    );

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Bundle updated successfully.',
      data: updatedBundle,
    });
  }, imagesUploadRollback),

  list: catchAsync(async (req, res) => {
    const bundles = await BundleService.list(
      req.query as Record<string, string>,
    );

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Bundles retrieved successfully.',
      data: bundles,
    });
  }),

  retrieve: catchAsync(async (req, res) => {
    const bundle = await BundleService.retrieve(req.params.slug);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Bundle retrieved successfully.',
      data: bundle,
    });
  }),

  delete: catchAsync(async (req, res) => {
    await BundleService.delete(req.params.bundleId);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Bundle deleted successfully.',
    });
  }),
};
