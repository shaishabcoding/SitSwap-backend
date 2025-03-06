import { Document, Types } from 'mongoose';

export interface IOrder extends Document {
  productDetails: TProductDetail[];
  customer: Types.ObjectId;
  transaction?: Types.ObjectId;
  paymentMethod?: string;
  amount: number;
  state: TOrderState;
}

export type TOrderState = 'pending' | 'success' | 'shipped' | 'cancel';

type TProductDetail = {
  bundle?: Types.ObjectId;
  product?: Types.ObjectId;
  price: number;
  month?: number;
  quantity: number;
  type: 'rent' | 'buy';
  productType: 'product' | 'bundle';
};
