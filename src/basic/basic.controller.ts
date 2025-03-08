import {
  Body,
  Controller,
  Delete,
  Get, HttpStatus,
  Post,
  Put,
  Query, Res,
} from '@nestjs/common';
import { CreateUserDto, CreateUserResponse } from './Dtos/create-dtos';
import { v4 as uuidv4 } from 'uuid';
import { Response } from 'express';
@Controller('basic')
export class BasicController {
  private static users: CreateUserDto[] = [
    {
      id: uuidv4(),
      username: 'dib91829',
      email: 'dib91829@gmail.com',
      password: '1234567890',
    },
    {
      id: uuidv4(),
      username: 'sma12361',
      email: 'sma12361@gmail.com',
      password: '10102010010',
    },
  ];
  @Get()
  getUsers(@Res() res: Response) {
    res.status(HttpStatus.FOUND).json(BasicController.users);
  }

  @Post()
  create(@Body() createUserDtos: CreateUserDto, @Res() res: Response) {
    BasicController.users.push(createUserDtos); // for scope
    // let res: CreateUserResponse;
    // eslint-disable-next-line prefer-const
    const response = {
      message: 'User created successfully.',
      totalUsers: BasicController.users.length, // for scope
    };
    res.status(HttpStatus.CREATED).json(response);
  }
  @Put()
  updateUsers(@Body() updateUserDto: CreateUserDto, @Res() res: Response) {
    console.log('filtering user based on id');
    const createUserDtos = BasicController.users.filter(
      (user) => user.username === updateUserDto.id,
    );
    console.log('Updating user');
    createUserDtos.forEach((user) => {
      user.username = updateUserDto.username;
      user.email = updateUserDto.email;
      user.password = updateUserDto.password;
    });
    res
      .status(HttpStatus.CREATED)
      .send('Total updated user' + createUserDtos.length + 1);
  }
  @Delete()
  deletUser(@Query('id') id: string) {
    const index = BasicController.users.findIndex((user) => user.id === id);
    console.log(
      'Items before deleting',
      BasicController.users.length.toFixed(),
    );
    if (index > -1) {
      console.log('item found');
      BasicController.users.splice(index, 1);
    }
    console.log('Items after deleting', BasicController.users.length.toFixed());
  }
}
