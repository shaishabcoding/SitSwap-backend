import catchAsync, { catchAsyncWithCallback } from '../../../shared/catchAsync';
import { imagesUploadRollback } from '../../middlewares/imageUploader';
import serveResponse from '../../../shared/serveResponse';
import { ProductService } from './Product.service';
import ServerError from '../../../errors/ServerError';
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';

export const ProductController = {
  create: catchAsyncWithCallback(async (req, res) => {
    const productData = {
      ...req.body,
      user: req.user!._id, // * track the user
    };

    const newProduct = await ProductService.create(productData);

    serveResponse(res, {
      message: 'Product created successfully.',
      data: newProduct,
      statusCode: StatusCodes.CREATED,
    });
  }, imagesUploadRollback),

  update: catchAsyncWithCallback(async (req, res) => {
    const updatedProduct = await ProductService.update(
      req.params.productId,
      req.body,
    );

    serveResponse(res, {
      message: 'Product updated successfully.',
      data: updatedProduct,
    });
  }, imagesUploadRollback),

  delete: catchAsync(async (req, res) => {
    await ProductService.delete(req.params.productId);

    serveResponse(res, {
      message: 'Product deleted successfully.',
    });
  }),

  list: catchAsync(async (req, res) => {
    const { products, meta } = await ProductService.list(req.query);

    serveResponse(res, {
      message: 'Product deleted successfully.',
      meta,
      data: products,
    });
  }),

  retrieveByIds: catchAsync(async (req, res) => {
    const { ids } = req.query;

    if (!ids || typeof ids !== 'string')
      throw new ServerError(
        StatusCodes.NOT_FOUND,
        'Invalid or missing product IDs. Provide a comma-separated string.',
      );

    const productIds = ids
      .split(',')
      .map(id => id.trim())
      .filter(id => mongoose.isValidObjectId(id));

    if (!productIds.length)
      throw new ServerError(
        StatusCodes.NOT_FOUND,
        'No valid product IDs provided.',
      );

    const products = await ProductService.retrieveByIds(productIds);

    serveResponse(res, {
      message: 'Products retrieved successfully.',
      data: products,
    });
  }),

  retrieve: catchAsync(async (req, res) => {
    const { data, meta } = await ProductService.retrieve(req);

    serveResponse(res, {
      message: 'Product retrieved successfully.',
      meta,
      data,
    });
  }),
};
