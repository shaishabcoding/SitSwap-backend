import { StatusCodes } from 'http-status-codes';
<<<<<<< HEAD
import ServerError from '../../../errors/ServerError';
import IBundle from './Bundle.interface';
=======
import ApiError from '../../../errors/ApiError';
import TBundle from './Bundle.interface';
>>>>>>> d7c4d194fee26245db6b8497e47d63fc4fd6f703
import Bundle from './Bundle.model';
import deleteFile from '../../../shared/deleteFile';

export const BundleService = {
<<<<<<< HEAD
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
=======
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
    })
      .populate('products', 'name images')
      .lean();

    if (!bundle) throw new ApiError(StatusCodes.NOT_FOUND, 'Bundle not found.');

    // ? array is reference type
    bundle.products.forEach((product: any) => {
      product.image = product.images[0];
      delete product.images;
    });

    return bundle as TBundle;
>>>>>>> d7c4d194fee26245db6b8497e47d63fc4fd6f703
  },

  async delete(bundleId: string) {
    const bundle = await Bundle.findByIdAndDelete(bundleId);

<<<<<<< HEAD
    if (!bundle)
      throw new ServerError(StatusCodes.NOT_FOUND, 'Bundle not found.');

    // ? delete old images asynchronously
    await Promise.all(
      bundle.images.map(async (image: string) => await deleteFile(image)),
    );
=======
    if (!bundle) throw new ApiError(StatusCodes.NOT_FOUND, 'Bundle not found.');

    if (bundle.banner) await deleteFile(bundle.banner);
>>>>>>> d7c4d194fee26245db6b8497e47d63fc4fd6f703
  },
};
