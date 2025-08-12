import mongoose, { Schema, Document } from 'mongoose';

export interface IContact extends Document {
  email: string;
  message: string;
  createdAt: Date;
}

const ContactSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  message: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model<IContact>('Contact', ContactSchema);
