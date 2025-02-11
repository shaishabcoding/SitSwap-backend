import { Types } from 'mongoose';

interface IPayment extends Document {
  id: string;
  user: Types.ObjectId;
  products?: Types.ObjectId[];
  buy_products?: Types.ObjectId;
  type: 'buy' | 'sell' | 'rent';
  amount: number;
  paymentMethod: string;
  transactionFee?: number;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
}

export default IPayment;
