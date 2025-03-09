import { StatusCodes } from 'http-status-codes';
import catchAsync, { catchAsyncWithCallback } from '../../../shared/catchAsync';
import serveResponse from '../../../shared/serveResponse';
import { imagesUploadRollback } from '../../middlewares/imageUploader';
import { BundleService } from './Bundle.service';
import sendResponse from '../../../shared/sendResponse';

export const BundleController = {
  create: catchAsyncWithCallback(async (req, res) => {
    const newBundle = await BundleService.create(req.body);

    serveResponse(res, {
      message: 'Bundle created successfully.',
      statusCode: StatusCodes.CREATED,
      data: newBundle,
    });
  }, imagesUploadRollback),

  update: catchAsyncWithCallback(async (req, res) => {
    const updatedBundle = await BundleService.update(
      req.params.bundleId,
      req.body,
    );

    serveResponse(res, {
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

    serveResponse(res, {
      message: 'Bundle deleted successfully.',
    });
  }),
};
