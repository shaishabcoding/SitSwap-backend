import catchAsync, { catchAsyncWithCallback } from '../../../shared/catchAsync';
import { imagesUploadRollback } from '../../middlewares/imageUploader';
import serveResponse from '../../../shared/serveResponse';
import { ProductService } from './Product.service';

export const ProductController = {
  create: catchAsyncWithCallback(async (req, res) => {
    const productData = {
      ...req.body,
      user: req.user!._id,
    };

    const newProduct = await ProductService.create(productData);

    serveResponse(res, {
      message: 'Product created successfully.',
      data: newProduct,
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
      message: 'Products retrieved successfully.',
      meta,
      data: products,
    });
  }),
};
