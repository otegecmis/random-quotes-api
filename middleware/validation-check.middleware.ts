import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

export const checkValidation = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const dataToValidate = { ...req.params, ...req.query, ...req.body };
    const { error } = schema.validate(dataToValidate, { abortEarly: false });

    if (error) {
      res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        details: error.details.map((err) => err.message),
      });

      return;
    }

    next();
  };
};
