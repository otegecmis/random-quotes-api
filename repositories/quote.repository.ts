import mongoose from 'mongoose';
import createError from 'http-errors';

import Quote, { IQuote } from '../models/Quote';

class QuoteRepository {
  async createQuote(quote: IQuote): Promise<IQuote> {
    try {
      return await Quote.create(quote);
    } catch (error: any) {
      throw createError(500, `${error.message}`);
    }
  }

  async getQuotes(currentPage: number, perPage: number) {
    try {
      const skip = (currentPage - 1) * perPage;
      const quotes = await Quote.find().skip(skip).limit(perPage).exec();
      const totalQuotes = await Quote.countDocuments();

      return {
        quotes,
        totalQuotes,
        totalPages: Math.ceil(totalQuotes / perPage),
        currentPage,
      };
    } catch (error: any) {
      throw createError(500, `${error.message}`);
    }
  }

  async getRandomQuote(): Promise<IQuote | null> {
    try {
      const count = await Quote.countDocuments();
      const randomIndex = Math.floor(Math.random() * count);

      return await Quote.findOne().skip(randomIndex);
    } catch (error: any) {
      throw createError(500, `${error.message}`);
    }
  }

  async getQuote(id: string): Promise<IQuote | null> {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw createError(400, 'Invalid ID format.');
      }

      const quote = await Quote.findById(id).exec();

      if (!quote) {
        throw createError(404, 'Quote not found.');
      }

      return quote;
    } catch (error: any) {
      throw createError(500, `${error.message}`);
    }
  }

  async updateQuote(id: string, quote: IQuote): Promise<IQuote | null> {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw createError(400, 'Invalid ID format');
      }

      const updatedQuote = await Quote.findByIdAndUpdate(id, quote, {
        new: true,
        runValidators: true,
      }).exec();

      if (!updatedQuote) {
        throw createError(404, 'Quote not found.');
      }

      return updatedQuote;
    } catch (error: any) {
      throw createError(500, `${error.message}`);
    }
  }

  async deleteQuote(id: string): Promise<void> {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw createError(400, 'Invalid ID format.');
      }

      const result = await Quote.findByIdAndDelete(id);

      if (!result) {
        throw createError(404, 'Quote not found.');
      }
    } catch (error: any) {
      throw createError(500, `${error.message}`);
    }
  }
}

export default new QuoteRepository();
