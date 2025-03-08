import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus, Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import { UserDto } from './Dtos/create-dtos';
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {
  }
  @Get()
  getUsers(@Res() res: Response) {
    const userDtos = this.usersService.fetchUsers();
    res.status(HttpStatus.OK).json(userDtos);
  }

  @Get(':id')
  getUser(@Param('id') id: string, @Res() res: Response) {
    const userDtos = this.usersService.fetchUser(id);
    res.status(HttpStatus.OK).json(userDtos);
  }

  @Post()
  create(@Body() createUserDtos: UserDto, @Res() res: Response) {
    const createdUserId = this.usersService.createUser(createUserDtos);
    res.status(HttpStatus.OK).json('User created with id - ' + createdUserId);
  }
  @Put()
  updateUsers(@Body() updateUserDto: UserDto, @Res() res: Response) {
    const isUpdated = this.usersService.updateUser(updateUserDto);
    if (isUpdated) {
      res.status(HttpStatus.OK).json('User updated');
    }
  }
  @Delete()
  deletUser(@Query('id') id: string, @Res() res: Response) {
    const isDeleted = this.usersService.deleteUser(id);
    if (isDeleted) {
      res.status(HttpStatus.OK).json('User deleted');
    }
  }
}
