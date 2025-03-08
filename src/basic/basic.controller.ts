import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateUserDto, CreateUserResponse } from './Dtos/create-dtos';
import { v4 as uuidv4 } from 'uuid';
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
  getUsers() {
    return BasicController.users; // for scope
  }

  @Post()
  create(@Body() createUserDtos: CreateUserDto) {
    BasicController.users.push(createUserDtos); // for scope
    let res: CreateUserResponse;
    // eslint-disable-next-line prefer-const
    res = {
      message: 'User created successfully.',
      totalUsers: BasicController.users.length, // for scope
    };
    return res;
  }
  @Put()
  updateUsers(@Body() updateUserDto: CreateUserDto) {
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
    return 'Total updated user' + createUserDtos.length + 1;
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
