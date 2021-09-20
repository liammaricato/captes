import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";

import { UsersController } from "./users.controller";
import { UserSchema } from "./users.model";
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService]
})

export class UsersModule {}
