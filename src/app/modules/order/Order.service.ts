import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { IOrder } from './Order.interface';
import Order from './Order.model';

export const OrderService = {
  async create(orderData: IOrder) {
    return await Order.create(orderData);
  },

  async list(query: Record<string, any>) {
    const orders = await Order.find(query);

    return { orders, meta: {} };
  },

  async delete(orderId: string) {
    const order = await Order.findByIdAndDelete(orderId);

    if (!order) throw new ApiError(StatusCodes.NOT_FOUND, 'Order not found.');
  },
};
