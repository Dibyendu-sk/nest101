import {
  Body,
  Controller,
  Delete,
  Get, HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import { UserDto } from './Dtos/create-dtos';
import { ApiCreatedResponse, ApiNotFoundResponse } from '@nestjs/swagger';
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  @ApiCreatedResponse({ type: [UserDto] })
  getUsers(@Res() res: Response) {
    const userDtos = this.usersService.fetchUsers();
    res.status(HttpStatus.OK).json(userDtos);
  }

  @Get(':id')
  @ApiCreatedResponse({ type: UserDto })
  @ApiNotFoundResponse()
  getUser(@Param('id') id: string, @Res() res: Response) {
    const user = this.usersService.fetchUser(id);
    if (!user) {
      throw new HttpException('user Not Found', HttpStatus.NOT_FOUND);
    }
    res.status(HttpStatus.OK).json(user);
  }

  @Post()
  @ApiCreatedResponse({ type: String })
  create(@Body() createUserDtos: UserDto, @Res() res: Response) {
    const createdUserId = this.usersService.createUser(createUserDtos);
    res.status(HttpStatus.OK).json('User created with id - ' + createdUserId);
  }
  @Put()
  @ApiCreatedResponse({ type: String })
  updateUsers(@Body() updateUserDto: UserDto, @Res() res: Response) {
    const isUpdated = this.usersService.updateUser(updateUserDto);
    if (isUpdated) {
      res.status(HttpStatus.OK).json('User updated');
    }
  }
  @Delete()
  @ApiCreatedResponse({ type: String })
  deletUser(@Query('id') id: string, @Res() res: Response) {
    const isDeleted = this.usersService.deleteUser(id);
    if (isDeleted) {
      res.status(HttpStatus.OK).json('User deleted');
    }
  }
}
