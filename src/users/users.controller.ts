import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async addUser(
    @Body('demolayId') demolayId: string,
    @Body('password') password: string,
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('chapterRole') chapterRole: string
  ) {
    return await this.usersService.insertUser(demolayId, password, name, email, chapterRole);
  }

  @Get()
  async getAllUsers() {
    return await this.usersService.getUsers();
  }

  @Get(':id')
  async getUser(@Param('id') userId: string) {
    return await this.usersService.getUser(userId);
  }

  // @Patch(':id')
  // async updateUser(
  //   @Param('id') userId: string,
  //   @Body() updatedUser: UpdatedUser
  // ) {
  //   return await this.usersService.updateUser(userId, updatedUser);
  // }

  @Delete(':id')
  async deleteUser(@Param('id') userId: string) {
    return await this.usersService.deleteUser(userId);
  }
}
