import { catchAsyncWithCallback } from '../../../shared/catchAsync';
import { imagesUploadRollback } from '../../middlewares/imageUploader';
import serveResponse from '../../../shared/serveResponse';
import { ProductService } from './Product.service';

export const ProductController = {
  create: catchAsyncWithCallback(async (req, res) => {
    const newProduct = await ProductService.create(req.body);

    serveResponse(res, {
      message: 'Product created successfully.',
      data: newProduct,
    });
  }, imagesUploadRollback),
};
