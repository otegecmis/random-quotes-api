import createError from 'http-errors';

import { IQuote } from '../models/Quote';
import quoteRepository from '../repositories/quote.repository';

class QuotesService {
  async createQuote(quote: IQuote): Promise<Object> {
    const createdQuote = await quoteRepository.createQuote(quote);

    return {
      id: createdQuote.id,
      quote: createdQuote.quote,
      author: createdQuote.author,
      information: {
        userID: createdQuote.userID,
        status: createdQuote.status,
      },
    };
  }

  async getQuoteByID(id: string) {
    const getQuote = await quoteRepository.getQuoteByID(id);

    if (!getQuote) {
      throw createError.NotFound('Quote not found.');
    }

    return getQuote;
  }

  async getQuotesByAuthor(id: string) {
    const getQuotesByAuthor = await quoteRepository.getQuotesByAuthor(id);

    if (!getQuotesByAuthor) {
      throw createError.NotFound('Quotes not found.');
    }

    return getQuotesByAuthor;
  }

  async getQuotes(currentPage: number, perPage: number) {
    const getQuotes = await quoteRepository.getQuotes(currentPage, perPage);

    const quotes = getQuotes.quotes.map((quote) => ({
      id: quote.id,
      quote: quote.quote,
      author: quote.author,
      information: {
        userID: quote.userID,
      },
    }));

    return {
      quotes,
      pagination: {
        totalQuotes: getQuotes.totalQuotes,
        totalPages: getQuotes.totalPages,
        currentPage: getQuotes.currentPage,
      },
    };
  }

  async getRandomQuote(): Promise<Object> {
    const getRandomQuote = await quoteRepository.getRandomQuote();

    if (!getRandomQuote) {
      throw createError.NotFound('Quote not found.');
    }

    return {
      id: getRandomQuote.id,
      quote: getRandomQuote.quote,
      author: getRandomQuote.author,
      information: {
        userID: getRandomQuote.userID,
      },
    };
  }

  async getQuote(id: string) {
    const getQuote = await this.getQuoteByID(id);

    return {
      id: getQuote.id,
      quote: getQuote.quote,
      author: getQuote.author,
      information: {
        userID: getQuote.userID,
      },
    };
  }

  async updateQuote(id: string, quote: IQuote) {
    const getQuote = await this.getQuoteByID(id);

    if (getQuote.userID.toString() !== quote.userID.toString()) {
      throw createError.Unauthorized(
        'You are not authorized to perform this action.',
      );
    }

    const updatedQuote = await quoteRepository.updateQuote(getQuote.id, quote);

    return {
      id: updatedQuote.id,
      quote: updatedQuote.quote,
      author: updatedQuote.author,
      information: {
        userID: updatedQuote.userID,
        status: updatedQuote.status,
      },
    };
  }

  async deleteQuote(id: string, userID: string): Promise<void> {
    const getQuote = await this.getQuoteByID(id);

    if (getQuote?.userID.toString() !== userID) {
      throw createError.Unauthorized(
        'You are not authorized to perform this action.',
      );
    }

    await quoteRepository.deleteQuote(getQuote.id);

    return;
  }
}

export default new QuotesService();
