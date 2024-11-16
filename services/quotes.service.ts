import createError from 'http-errors';

import { IQuote } from '../models/Quote';
import quoteRepository from '../repositories/quote.repository';

class QuotesService {
  async createQuote(quote: IQuote): Promise<IQuote> {
    return quoteRepository.createQuote(quote);
  }

  async getQuotes(currentPage: number, perPage: number) {
    return quoteRepository.getQuotes(currentPage, perPage);
  }

  async getRandomQuote(): Promise<IQuote | null> {
    return await quoteRepository.getRandomQuote();
  }

  async getQuote(id: string) {
    var getQuote = await quoteRepository.getQuote(id);

    if (!getQuote) {
      throw createError.NotFound('Quote not found.');
    }

    return getQuote;
  }

  async updateQuote(id: string, quote: IQuote) {
    var getQuote = await this.getQuote(id);

    if (getQuote.userID.toString() !== quote.userID.toString()) {
      throw createError.Unauthorized();
    }

    return await quoteRepository.updateQuote(id, quote);
  }

  async deleteQuote(id: string, userID: string): Promise<void | null> {
    var getQuote = await this.getQuote(id);

    if (getQuote?.userID.toString() !== userID) {
      throw createError.Unauthorized();
    }

    await quoteRepository.deleteQuote(id);

    return;
  }
}

export default new QuotesService();
