import IProduct from './Product.interface';
import Product from './Product.model';

export const ProductService = {
  async create(productData: IProduct) {
    return await Product.create(productData);
  },
};
