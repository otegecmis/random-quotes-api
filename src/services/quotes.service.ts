import { IQuote } from '../models/Quote';
import quoteRepository from '../repositories/quote.repository';

class QuotesService {
  async createQuote(quote: IQuote): Promise<IQuote> {
    return quoteRepository.createQuote(quote);
  }

  async getRandomQuote(): Promise<IQuote | null> {
    return await quoteRepository.getRandomQuote();
  }

  async deleteQuote(id: string): Promise<void | null> {
    return await quoteRepository.deleteQuote(id);
  }
}

export default new QuotesService();
