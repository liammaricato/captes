import * as mongoose from 'mongoose';

export const AdministrativePeriodSchema = new mongoose.Schema({
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: false },
  number: { type: Number, required: true }
}, { timestamps: true }
);

export interface AdministrativePeriod extends mongoose.Document {
  id: string;
  startDate: Date;
  endDate: Date;
  number: number;
  createdAt: Date;
  updatedAt: Date;
}