import { model, Schema } from 'mongoose';
import IPayment from './Payment.interface';

const paymentSchema = new Schema<IPayment>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
    buy_products: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
    type: {
      type: String,
      enum: ['buy', 'sell', 'rent'],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    transactionFee: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  },
);

export default model<IPayment>('Payment', paymentSchema);
