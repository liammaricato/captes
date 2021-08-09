import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { EntriesController } from "./entries.controller";
import { EntrySchema } from "./entries.model";
import { EntriesService } from "./entries.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Entry', schema: EntrySchema }])
  ],
  controllers: [EntriesController],
  providers: [EntriesService]
})

export class EntriesModule {}
