import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EntriesModule } from './entry/entries.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AdministrativePeriodModule } from './administrative-period/administrative-period.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:admin@captes.bg8zh.mongodb.net/captes-dev?retryWrites=true&w=majority'
    ),
    EntriesModule,
    UsersModule,
    AuthModule,
    AdministrativePeriodModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
