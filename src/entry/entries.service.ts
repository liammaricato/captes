import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { Entry } from "./entries.model"

@Injectable()
export class EntriesService {
  private entries: Entry[] = [];

  constructor(
    @InjectModel('Entry') private readonly entryModel: Model<Entry>
  ) {}

  async insertEntry(value: number, description: string, date: string) {
    const newEntry = new this.entryModel({
      value,
      description,
      date: new Date(date)
    });
    const entry = await newEntry.save();
    return this.serializeEntry(entry);
  }

  async getEntries() {
    const entries = await this.entryModel.find().exec();
    return entries.map(entry => (this.serializeEntry(entry)));
  }

  async getEntry(id: string) {
    const entry = await this.findEntry(id);
    return this.serializeEntry(entry)
  }

  async updateEntry(id: string, value: number, description: string, date: string) {
    const updatedEntry = await this.findEntry(id);
    if (value) {
      updatedEntry.value = value;
    }
    if (description) {
      updatedEntry.description = description;
    }
    if (date) {
      updatedEntry.date = new Date(date);
    }
    updatedEntry.save();
    return this.serializeEntry(updatedEntry);
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
    let entry;
    try {
      entry = await this.entryModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find entry.');
    }
    if (!entry) {
      throw new NotFoundException('Could not find entry.');
    }
    return entry
  }

  private serializeEntry(entry: Entry) {
    return {
      id: entry.id,
      value: entry.value,
      description: entry.description,
      date: entry.date,
      createdAt: entry.createdAt,
      updatedAt: entry.updatedAt
    }
  }
}
