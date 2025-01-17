import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  surname: string;
  email: string;
  password: string;
  role?: string;
  status?: Boolean;
}

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'User',
  },
  status: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.model<IUser>('User', UserSchema);
