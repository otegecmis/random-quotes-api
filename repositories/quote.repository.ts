import createError from 'http-errors';

import Quote, { IQuote, EStatus } from '../models/Quote';

class QuoteRepository {
  async createQuote(quote: IQuote): Promise<IQuote> {
    try {
      return await Quote.create(quote);
    } catch (error: any) {
      throw createError(500, `${error.message}`);
    }
  }

  async getQuoteByID(id: string): Promise<IQuote | null> {
    try {
      return await Quote.findById(id).exec();
    } catch (error: any) {
      throw createError(500, `${error.message}`);
    }
  }

  async getQuotesByAuthor(id: string) {
    try {
      return await Quote.find({ userID: id }).exec();
    } catch (error: any) {
      throw createError(500, `${error.message}`);
    }
  }

  async getQuotes(currentPage: number, perPage: number) {
    try {
      const skip = (currentPage - 1) * perPage;
      const quotes = await Quote.find({ status: EStatus.active })
        .skip(skip)
        .limit(perPage)
        .exec();
      const totalQuotes = await Quote.countDocuments({
        status: EStatus.active,
      });

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
      const count = await Quote.countDocuments({ status: EStatus.active });

      if (count === 0) {
        throw createError.NotFound(
          'Currently, there are no quotes available to display.',
        );
      }

      const randomIndex = Math.floor(Math.random() * count);

      return await Quote.findOne({ status: EStatus.active })
        .skip(randomIndex)
        .exec();
    } catch (error: any) {
      throw createError(500, `${error.message}`);
    }
  }

  async updateQuote(id: string, quote: IQuote): Promise<IQuote> {
    try {
      const updatedQuote = await Quote.findByIdAndUpdate(id, quote, {
        new: true,
        runValidators: true,
      }).exec();

      if (!updatedQuote) {
        throw createError(
          404,
          'The quote you are trying to update was not found.',
        );
      }

      return updatedQuote;
    } catch (error: any) {
      throw createError(500, `${error.message}`);
    }
  }

  async deleteQuote(id: string): Promise<void> {
    try {
      const deletedQuote = await Quote.findByIdAndUpdate(
        id,
        { status: EStatus.inactive },
        { new: true, runValidators: true },
      ).exec();

      if (!deletedQuote) {
        throw createError(
          404,
          'The quote you are trying to delete does not exist.',
        );
      }
    } catch (error: any) {
      throw createError(500, `${error.message}`);
    }
  }
}

export default new QuoteRepository();
