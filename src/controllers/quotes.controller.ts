import { NextFunction, Request, Response } from 'express';

import { IQuote } from '../models/Quote';
import quotesService from '../services/quotes.service';

import {
  createQuoteValidationSchema,
  deleteQuoteValidationSchema,
} from '../validations/quotes.validation';

class QuotesController {
  async createQuotes(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { error } = createQuoteValidationSchema.validate(req.body);

      if (error) {
        res.status(400).json({
          result: {
            message: error.details[0].message,
          },
        });

        return;
      }

      const { quote, author } = req.body;

      const result = await quotesService.createQuote({
        quote,
        author,
      } as IQuote);

      res.status(201).json({
        result,
      });
    } catch (error) {
      next(error);
    }
  }

  async randomQuotes(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const result = await quotesService.getRandomQuote();

      res.status(200).json({
        result,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteQuotes(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { error } = deleteQuoteValidationSchema.validate(req.params);

      if (error) {
        res.status(400).json({
          result: {
            message: error.details[0].message,
          },
        });

        return;
      }

      const { id } = req.params;
      await quotesService.deleteQuote(id);

      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
}

export default new QuotesController();
