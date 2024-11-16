import mongoose, { Schema, Document } from 'mongoose';

export interface IQuote extends Document {
  quote: string;
  author: string;
  status: string;
  userID: mongoose.Types.ObjectId;
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
  status: {
    type: String,
    default: 'active',
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

export default mongoose.model<IQuote>('Quote', QuoteSchema);
