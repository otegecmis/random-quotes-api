import mongoose, { Schema, Document } from 'mongoose';

export interface IQuote extends Document {
  quote: string;
  author: string;
}

const QuoteSchema: Schema = new Schema({
  quote: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
});

export default mongoose.model<IQuote>('Quote', QuoteSchema);
