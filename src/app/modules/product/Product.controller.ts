import { catchAsyncWithCallback } from '../../../shared/catchAsync';
import { imagesUploadRollback } from '../../middlewares/imageUploader';
import serveResponse from '../../../shared/serveResponse';
import { ProductService } from './Product.service';

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
};
