import mongoose from 'mongoose';
import createError from 'http-errors';

import Quote, { IQuote } from '../models/Quote';

class QuoteRepository {
  async createQuote(quote: IQuote): Promise<IQuote> {
    try {
      return await Quote.create(quote);
    } catch (error: any) {
      throw createError(500, `Unable to create the quote: ${error.message}`);
    }
  }

  async getRandomQuote(): Promise<IQuote | null> {
    try {
      const count = await Quote.countDocuments();
      const randomIndex = Math.floor(Math.random() * count);

      return await Quote.findOne().skip(randomIndex);
    } catch (error: any) {
      throw createError(
        500,
        `Unable to fetch a random quote: ${error.message}`,
      );
    }
  }

  async deleteQuote(id: string): Promise<void> {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw createError(400, 'Invalid ID format');
      }

      const result = await Quote.findByIdAndDelete(id);

      if (!result) {
        throw createError(404, 'Quote not found.');
      }
    } catch (error: any) {
      throw createError(500, `Unable to delete the quote: ${error.message}`);
    }
  }
}

export default new QuoteRepository();
