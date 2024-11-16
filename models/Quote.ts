import mongoose, { Schema, Document } from 'mongoose';

export enum EStatus {
  'active' = 1,
  'pending' = 2,
  'inactive' = 3,
}
export interface IQuote extends Document {
  quote: string;
  author: string;
  status?: EStatus;
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
    type: Number,
    enum: EStatus,
    default: EStatus.active,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

export default mongoose.model<IQuote>('Quote', QuoteSchema);
