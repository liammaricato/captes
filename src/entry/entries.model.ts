import * as mongoose from 'mongoose';

export const EntrySchema = new mongoose.Schema({
  value: { type: Number, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true }
}, { timestamps: true }
);

export interface Entry extends mongoose.Document {
  id: string;
  value: number;
  description: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}
