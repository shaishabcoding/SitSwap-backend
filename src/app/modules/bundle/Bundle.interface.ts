import { Document, Types } from 'mongoose';

interface IBundle extends Document {
  name: string;
  description: string;
  images: string[];
  products: Types.ObjectId[];
  isRentable: boolean;
  isAvailable: boolean;
  buy_price: number;
  rent_price: number;
  purchasedCount: number;
  rating: number;
  user: Types.ObjectId;
}

export default IBundle;
