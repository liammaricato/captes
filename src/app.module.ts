import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EntriesModule } from './entry/entries.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    EntriesModule,
    MongooseModule.forRoot(
      'mongodb+srv://admin:admin@captes.bg8zh.mongodb.net/captes-dev?retryWrites=true&w=majority'
    ),
    UsersModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
