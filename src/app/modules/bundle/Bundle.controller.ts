import catchAsync from '../../../shared/catchAsync';
import serveResponse from '../../../shared/serveResponse';
import { BundleService } from './Bundle.service';

export const BundleController = {
  create: catchAsync(async (req, res) => {
    const newBundle = await BundleService.create(req.body);

    serveResponse(res, {
      message: 'Bundle created successfully.',
      data: newBundle,
    });
  }),

  update: catchAsync(async (req, res) => {
    const updatedBundle = await BundleService.update(
      req.params.bundleId,
      req.body,
    );

    serveResponse(res, {
      message: 'Bundle updated successfully.',
      data: updatedBundle,
    });
  }),
};
