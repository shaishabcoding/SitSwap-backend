import { StatusCodes } from 'http-status-codes';
import ServerError from '../../../errors/ServerError';
import IProduct from './Product.interface';
import Product from './Product.model';
import deleteFile from '../../../shared/deleteFile';

export const ProductService = {
  async create(productData: IProduct) {
    return await Product.create(productData);
  },

  async update(productId: string, updatedData: Partial<IProduct>) {
    const product = await Product.findById(productId);

    if (!product)
      throw new ServerError(StatusCodes.NOT_FOUND, 'Product not found.');

    const imagesToDelete = product.images || [];

    Object.assign(product, updatedData); // ? update product

    await product.save();

    if (updatedData.images && updatedData.images.length > 0)
      // ? delete old images asynchronously
      await Promise.all(
        imagesToDelete.map(async (image: string) => await deleteFile(image)),
      );

    return product;
  },
};
