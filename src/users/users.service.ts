import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
const securePassword = require('secure-password');

import { User } from "./users.model";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>
  ) {}

  async insertUser(demolayId: string, password: string, name: string, email: string, chapterRole: string) {
    const newUser = new this.userModel({
      demolayId,
      password: await this.createHashedPassword(password),
      email,
      name,
      chapterRole,
    });
    return await newUser.save();
  }

  async getUsers() {
    return await this.userModel.find().exec();
  }

  async getUser(id: string) {
    return await this.findById(id);
  }

  // async updateUser(id: string, entryDTO: UpdatedEntry) {
  //   return await this.userModel.findOneAndUpdate({ _id: id }, entryDTO, { new: true }).exec();
  // }

  async deleteUser(id: string) {
    const result = await this.userModel.deleteOne({ _id: id }).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find user.');
    } else {
      return { message: 'User successfully deleted.' }
    }
  }

  async findByDemolayId(demolayId: string): Promise<User> {
    const user = await this.userModel.findOne({ demolayId }).exec();
    return user
  }

  async rehashUserPassword(userId: string, newPassword: string) {
    const hashedPassword = await this.createHashedPassword(newPassword);
    return await this.userModel.findOneAndUpdate({ _id: userId }, { password: hashedPassword }, { new: true }).exec();
  }

  private async createHashedPassword(password: string): Promise<string> {
    const pwd = securePassword();
    const hashedPassword = await pwd.hash(Buffer.from(password));
    return hashedPassword.toString();
  }

  private async findById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException('Could not find user.');
    }
    return user
  }
}
