import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  demolayId: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
  chapterRole: {
    type: String,
    enum: [
      'ACTIVE_MEMBER',
      'TREASURER',
      'TREASURY_MEMBER',
      'COUNCIL_MEMBER',
      'COUNCIL_PRESIDENT',
      'MASTER_COUNCILOR'
    ],
    default: 'ACTIVE_MEMBER'
  },
}, { timestamps: true }
);

export interface User extends mongoose.Document {
  id: string;
  demolayId: string;
  password: string;
  email: string;
  name: string;
  chapterRole: string;
  createdAt: Date;
  updatedAt: Date;
}
