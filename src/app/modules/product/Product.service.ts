import { StatusCodes } from 'http-status-codes';
import ServerError from '../../../errors/ServerError';
import IProduct from './Product.interface';
import Product from './Product.model';
import deleteFile from '../../../shared/deleteFile';
import ProductReview from '../product-review/ProductReview.model';
import { Types } from 'mongoose';
import { Request } from 'express';

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

  async delete(productId: string) {
    const product = await Product.findByIdAndDelete(productId);

    if (!product)
      throw new ServerError(StatusCodes.NOT_FOUND, 'Product not found.');

    // ? delete old images asynchronously
    await Promise.all(
      product.images.map(async (image: string) => await deleteFile(image)),
    );
  },

  async list(query: Record<string, any>) {
    const products = await Product.find(query);

    return {
      products,
      meta: {},
    };
  },

  async retrieveByIds(ids: string[]) {
    return await Product.find({ _id: { $in: ids } });
  },

  async retrieve({ params, query }: Request) {
    const { productId } = params,
      { reviewPage = '1', reviewLimit = '10' } = query;

    const product = await Product.findById(productId);

    if (!product)
      throw new ServerError(StatusCodes.NOT_FOUND, 'Product not found.');

    const reviews = await ProductReview.aggregate([
      { $match: { product: new Types.ObjectId(productId) } },
      {
        $addFields: {
          date: { $ifNull: ['$updatedAt', '$createdAt'] },
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'user',
        },
      },
      { $unwind: '$user' },
      {
        $project: {
          'user.name': 1,
          'user.avatar': 1,
          rating: 1,
          review: 1,
          _id: 0,
          date: 1,
        },
      },
      { $sort: { date: -1 } },
      { $skip: (+reviewPage - 1) * +reviewLimit },
      { $limit: +reviewLimit },
    ]);

    const totalReviews = await ProductReview.countDocuments({
      product: productId,
    });

    return {
      data: { product, reviews },
      meta: {
        currentReviewLimit: +reviewLimit,
        currentReviewPage: +reviewPage,
        totalReviewPage: Math.ceil(totalReviews / +reviewLimit),
        totalReviews,
      },
    };
  },
};
