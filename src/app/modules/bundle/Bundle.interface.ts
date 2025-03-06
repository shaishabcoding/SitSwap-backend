<<<<<<< HEAD
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
=======
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
>>>>>>> d7c4d194fee26245db6b8497e47d63fc4fd6f703
