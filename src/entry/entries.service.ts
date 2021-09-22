import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { Entry } from "./entries.model"

class UpdatedEntry {
  value: number;
  description: string;
  date: Date;
}

@Injectable()
export class EntriesService {
  constructor(
    @InjectModel('Entry') private readonly entryModel: Model<Entry>
  ) {}

  async insertEntry(value: number, description: string, date: string) {
    const newEntry = new this.entryModel({
      value,
      description,
      date: new Date(date)
    });
    return await newEntry.save();
  }

  async getEntries() {
    return await this.entryModel.find().exec();
  }

  async getEntry(id: string) {
    return await this.findEntry(id);
  }

  async getLastEntriesFromOffset(quantity: number, offset: number) {
    return await this.entryModel.find({}).sort({ date: -1 }).skip(offset).limit(quantity);
  }

  async updateEntry(id: string, entryDTO: UpdatedEntry) {
    return await this.entryModel.findOneAndUpdate({ _id: id }, entryDTO, { new: true }).exec();
  }

  async deleteEntry(id: string) {
    const result = await this.entryModel.deleteOne({ _id: id }).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find entry.');
    } else {
      return { message: 'Entry successfully deleted.' }
    }
  }

  private async findEntry(id: string): Promise<Entry> {
    const entry = await this.entryModel.findById(id).exec();
    if (!entry) {
      throw new NotFoundException('Could not find entry.');
    }
    return entry
  }
}
