import catchAsync, { catchAsyncWithCallback } from '../../../shared/catchAsync';
import serveResponse from '../../../shared/serveResponse';
import { imagesUploadRollback } from '../../middlewares/imageUploader';
import { BundleService } from './Bundle.service';

export const BundleController = {
  create: catchAsyncWithCallback(async (req, res) => {
    const newBundle = await BundleService.create(req.body);

    serveResponse(res, {
      message: 'Bundle created successfully.',
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

  delete: catchAsync(async (req, res) => {
    await BundleService.delete(req.params.bundleId);

    serveResponse(res, {
      message: 'Bundle deleted successfully.',
    });
  }),
};
