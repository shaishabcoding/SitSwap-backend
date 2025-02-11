import { Document, Types } from 'mongoose';

interface IProduct extends Document {
  name: string;
  room_type: string;
  item_type: string;
  color: string;
  size: string;
  material: string;
  buy_price: number;
  rent_price: number;
  stock: number;
  images: string[];
  description: string;
  dimension: Record<string, string>;
  specifications: string[];
  isAvailable: boolean;
  isRentable: boolean;
  user: Types.ObjectId;
}

export default IProduct;
