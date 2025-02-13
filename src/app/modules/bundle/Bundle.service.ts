import { StatusCodes } from 'http-status-codes';
import ServerError from '../../../errors/ServerError';
import IBundle from './Bundle.interface';
import Bundle from './Bundle.model';
import deleteFile from '../../../shared/deleteFile';

export const BundleService = {
  async create(bundleData: IBundle) {
    return await Bundle.create(bundleData);
  },

  async update(bundleId: string, updatedData: Partial<IBundle>) {
    const bundle = await Bundle.findById(bundleId);

    if (!bundle)
      throw new ServerError(StatusCodes.NOT_FOUND, 'Bundle not found.');

    const imagesToDelete = bundle.images || [];

    Object.assign(bundle, updatedData); // ? update bundle

    await bundle.save();

    if (updatedData.images?.length)
      // ? delete old images asynchronously
      await Promise.all(
        imagesToDelete.map(async (image: string) => await deleteFile(image)),
      );

    return bundle;
  },

  async delete(bundleId: string) {
    const bundle = await Bundle.findByIdAndDelete(bundleId);

    if (!bundle)
      throw new ServerError(StatusCodes.NOT_FOUND, 'Bundle not found.');

    // ? delete old images asynchronously
    await Promise.all(
      bundle.images.map(async (image: string) => await deleteFile(image)),
    );
  },
};
