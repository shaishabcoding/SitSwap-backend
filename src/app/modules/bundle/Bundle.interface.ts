import { Types } from 'mongoose';

type TBundle = {
  name: string;
  description: string;
  banner: string;
  products: string[];
  buy_price: number;
  rent_price: number;
  slug: string;
  stock: number;
  isAvailable: boolean;
  isRentable: boolean;
  user: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  additional: Record<string, string>;
};

export default TBundle;
