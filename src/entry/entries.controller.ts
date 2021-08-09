import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";

import { EntriesService } from "./entries.service";

@Controller('entries')
export class EntriesController {
  constructor(private readonly entriesService: EntriesService) {}

  @Post()
  async addEntry(
    @Body('value') entryValue: number,
    @Body('description') entryDescription: string,
    @Body('date') entryDate: string
  ) {
    const result = await this.entriesService.insertEntry(entryValue, entryDescription, entryDate);
    return result;
  }

  @Get()
  async getAllEntries() {
    return await this.entriesService.getEntries();
  }

  @Get(':id')
  async getEntry(@Param('id') entryId: string) {
    return await this.entriesService.getEntry(entryId);
  }

  @Patch(':id')
  async updateEntry(
    @Param('id') entryId: string,
    @Body('value') entryValue: number,
    @Body('description') entryDescription: string,
    @Body('date') entryDate: string
  ) {
    return await this.entriesService.updateEntry(entryId, entryValue, entryDescription, entryDate);
  }

  @Delete(':id')
  async deleteEntry(@Param('id') entryId: string) {
    return await this.entriesService.deleteEntry(entryId);
  }
}
