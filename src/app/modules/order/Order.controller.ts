import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { OrderService } from './Order.service';

export const OrderController = {
  create: catchAsync(async (req, res) => {
    const order = await OrderService.create(req.body);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Order created successfully.',
      data: order,
    });
  }),

  list: catchAsync(async (req, res) => {
    const { orders, meta } = await OrderService.list(req.query);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Orders fetched successfully.',
      data: { orders, meta },
    });
  }),

  delete: catchAsync(async (req, res) => {
    await OrderService.delete(req.params.orderId);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Order deleted successfully.',
    });
  }),
};
