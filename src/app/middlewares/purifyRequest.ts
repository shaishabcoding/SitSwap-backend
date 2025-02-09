import { AnyZodObject } from 'zod';
import catchAsync from '../../shared/catchAsync';

/**
 * Middleware to purify and validate the request {body, cookies} using a Zod schema.
 *
 * This middleware uses the provided Zod schema to parse and validate the request body.
 * If the validation is successful, the purified data is assigned back to `req.body`.
 * If the validation fails, an error is thrown and handled by the `catchAsync` function.
 *
 * @param {AnyZodObject} schema - The Zod schema to validate the request body against.
 * @return Middleware function to purify the request body.
 */
const purifyRequest = (schema: AnyZodObject) =>
  catchAsync(async (req, _, next) => {
    req.body = await schema.parseAsync(req.body);
    next();
  });

export default purifyRequest;
