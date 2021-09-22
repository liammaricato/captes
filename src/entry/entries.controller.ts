import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { Transform } from "class-transformer";
import { IsDateString, IsNumber, IsString, Min } from "class-validator";

import { EntriesService } from "./entries.service";

class UpdatedEntry {
  @IsNumber()
  @Min(0)
  value: number;

  @IsString()
  description: string;

  @IsDateString()
  date: Date;
}

@Controller('entries')
export class EntriesController {
  constructor(private readonly entriesService: EntriesService) {}

  @Post()
  async addEntry(
    @Body('value') entryValue: number,
    @Body('description') entryDescription: string,
    @Body('date') entryDate: string
  ) {
    return await this.entriesService.insertEntry(entryValue, entryDescription, entryDate);
  }

  @Get()
  async getAllEntries() {
    return await this.entriesService.getEntries();
  }

  @Get('/last/:quantity/:offset')
  async getLastEntriesFromOffset(@Param('quantity') quantity: number, @Param('offset') offset: number) {
    return await this.entriesService.getLastEntriesFromOffset(quantity, offset);
  }

  @Get(':id')
  async getEntry(@Param('id') entryId: string) {
    return await this.entriesService.getEntry(entryId);
  }

  @Patch(':id')
  async updateEntry(
    @Param('id') entryId: string,
    @Body() updatedEntry: UpdatedEntry
  ) {
    return await this.entriesService.updateEntry(entryId, updatedEntry);
  }

  @Delete(':id')
  async deleteEntry(@Param('id') entryId: string) {
    return await this.entriesService.deleteEntry(entryId);
  }
}
