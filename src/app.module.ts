import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EntriesModule } from './entry/entries.module';

@Module({
  imports: [
    EntriesModule,
    MongooseModule.forRoot(
      'mongodb+srv://admin:admin@captes.bg8zh.mongodb.net/captes-dev?retryWrites=true&w=majority'
    )
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
