import { Schema, model } from 'mongoose';
import { IOrder } from './Order.interface';

const orderSchema = new Schema<IOrder>(
  {
    productDetails: [
      {
        bundle: { type: Schema.Types.ObjectId, ref: 'Bundle' },
        product: { type: Schema.Types.ObjectId, ref: 'Product' },
        price: { type: Number, required: true },
        month: { type: Number },
        quantity: { type: Number, required: true },
        type: { type: String, enum: ['rent', 'buy'], required: true },
        productType: {
          type: String,
          enum: ['product', 'bundle'],
          required: true,
        },
      },
    ],
    customer: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
    transaction: { type: Schema.Types.ObjectId, ref: 'Transaction' },
    paymentMethod: { type: String },
    amount: { type: Number, required: true },
    state: {
      type: String,
      enum: ['pending', 'success', 'shipped', 'cancel'],
      required: true,
    },
  },
  { timestamps: true },
);

const Order = model<IOrder>('Order', orderSchema);

export default Order;
