import { Types } from 'mongoose';

type TReview = {
  user: Types.ObjectId;
  product?: string;
  bundle?: string;
  rating: number;
  review: string;
  createdAt: Date;
  updatedAt: Date;
};

export default TReview;
