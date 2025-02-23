import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import TBundle from './Bundle.interface';
import Bundle from './Bundle.model';
import deleteFile from '../../../shared/deleteFile';

export const BundleService = {
  async create(bundleData: TBundle) {
    return (await Bundle.create(bundleData)) as TBundle;
  },

  async update(bundleId: string, updatedData: Partial<TBundle>) {
    const bundle = await Bundle.findById(bundleId);

    if (!bundle) throw new ApiError(StatusCodes.NOT_FOUND, 'Bundle not found.');

    Object.assign(bundle, updatedData); // ? update bundle

    if (updatedData.banner) await deleteFile(bundle.banner); // ? delete old banner

    return (await bundle.save()) as TBundle;
  },

  async list(query: Record<string, string>) {
    const { page = '1', limit = '10' } = query;

    const bundles = await Bundle.find()
      .limit(+limit)
      .skip((+page - 1) * +limit)
      .select('name banner slug');

    return bundles as TBundle[];
  },

  async retrieve(slug: string) {
    const bundle = await Bundle.findOne({
      slug,
    });

    if (!bundle) throw new ApiError(StatusCodes.NOT_FOUND, 'Bundle not found.');

    return bundle as TBundle;
  },

  async delete(bundleId: string) {
    const bundle = await Bundle.findByIdAndDelete(bundleId);

    if (!bundle) throw new ApiError(StatusCodes.NOT_FOUND, 'Bundle not found.');
  },
};
