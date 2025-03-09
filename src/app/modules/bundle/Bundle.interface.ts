import { Types } from 'mongoose';

type TBundle = {
  name: string;
  description: string;
  banner: string;
  products: string[];
  buyPrice: number;
  rentPrice: number;
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
