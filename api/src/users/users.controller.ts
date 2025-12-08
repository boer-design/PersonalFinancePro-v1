import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async create(@Body() body: { email: string; password: string }) {
    // very simple (no hashing yet)
    return this.usersService.createUser(body.email, body.password);
  }

  @Get()
  async findAll() {
    return this.usersService.getAllUsers();
  }
}
