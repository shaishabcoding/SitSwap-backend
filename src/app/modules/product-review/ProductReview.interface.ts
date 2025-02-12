import { Document, Types } from 'mongoose';

interface IProductReview extends Document {
  user: Types.ObjectId;
  product: Types.ObjectId;
  rating: number;
  review: string;
}

export default IProductReview;
