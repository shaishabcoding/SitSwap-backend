import { StatusCodes } from 'http-status-codes';
import catchAsync, { catchAsyncWithCallback } from '../../../shared/catchAsync';
<<<<<<< HEAD
import serveResponse from '../../../shared/serveResponse';
import { imagesUploadRollback } from '../../middlewares/imageUploader';
import { BundleService } from './Bundle.service';

export const BundleController = {
  create: catchAsyncWithCallback(async (req, res) => {
    const newBundle = await BundleService.create(req.body);

    serveResponse(res, {
      message: 'Bundle created successfully.',
      data: newBundle,
      statusCode: StatusCodes.CREATED,
=======
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
>>>>>>> d7c4d194fee26245db6b8497e47d63fc4fd6f703
    });
  }, imagesUploadRollback),

  update: catchAsyncWithCallback(async (req, res) => {
    const updatedBundle = await BundleService.update(
      req.params.bundleId,
      req.body,
    );

<<<<<<< HEAD
    serveResponse(res, {
=======
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
>>>>>>> d7c4d194fee26245db6b8497e47d63fc4fd6f703
      message: 'Bundle updated successfully.',
      data: updatedBundle,
    });
  }, imagesUploadRollback),

<<<<<<< HEAD
  delete: catchAsync(async (req, res) => {
    await BundleService.delete(req.params.bundleId);

    serveResponse(res, {
=======
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
>>>>>>> d7c4d194fee26245db6b8497e47d63fc4fd6f703
      message: 'Bundle deleted successfully.',
    });
  }),
};
