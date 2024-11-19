import { NextFunction, Request, Response } from 'express';

import { IQuote } from '../models/Quote';
import quotesService from '../services/quotes.service';

import { AuthRequest } from '../middleware/auth-check.middleware';

class QuotesController {
  async createQuote(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { quote, author } = req.body;
      const authID = req.payload.aud;
      const result = await quotesService.createQuote({
        quote,
        author,
        userID: authID,
      } as IQuote);

      res.status(201).json({
        result,
      });
    } catch (error) {
      next(error);
    }
  }

  async getQuotes(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const currentPage = req.query.currentPage
        ? parseInt(req.query.currentPage as string, 10)
        : 1;
      const perPage = req.query.perPage
        ? parseInt(req.query.perPage as string, 10)
        : 10;
      const result = await quotesService.getQuotes(currentPage, perPage);

      res.status(200).json({
        result,
      });
    } catch (error) {
      next(error);
    }
  }

  async randomQuote(
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

  async getQuote(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const result = await quotesService.getQuote(id);

      res.status(200).json({
        result,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateQuote(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const { quote, author } = req.body;
      const authID = req.payload.aud;
      const result = await quotesService.updateQuote(id, {
        quote,
        author,
        userID: authID,
      } as IQuote);

      res.status(200).json({
        result,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteQuote(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const authID = req.payload.aud;

      await quotesService.deleteQuote(id, authID);

      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
}

export default new QuotesController();
