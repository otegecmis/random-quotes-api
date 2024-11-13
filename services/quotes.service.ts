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
    return await quoteRepository.getQuote(id);
  }

  async updateQuote(id: string, quote: IQuote) {
    return await quoteRepository.updateQuote(id, quote);
  }

  async deleteQuote(id: string): Promise<void | null> {
    return await quoteRepository.deleteQuote(id);
  }
}

export default new QuotesService();
