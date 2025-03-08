import { Injectable } from '@nestjs/common';
import { UserDto } from './Dtos/create-dtos';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class UsersService {
  private users: UserDto[] = [];
  fetchUsers(): UserDto[] {
    return this.users;
  }
  fetchUser(id: string): UserDto[] {
    return this.users.filter((u) => u.id === id);
  }
  createUser(userDto: UserDto) {
    userDto.id = uuidv4();
    this.users.push(userDto);
    return userDto.id;
  }
  updateUser(userDto: UserDto) {
    console.log('filtering user based on id');
    const createUserDtos = this.users.filter(
      (user) => user.username === userDto.id,
    );
    console.log('Updating user');
    createUserDtos.forEach((user) => {
      user.username = userDto.username;
      user.email = userDto.email;
      user.password = userDto.password;
    });
    return true;
  }
  deleteUser(id: string) {
    const index = this.users.findIndex((user) => user.id === id);
    console.log('Items before deleting', this.users.length.toFixed());
    if (index > -1) {
      console.log('item found');
      this.users.splice(index, 1);
    }
    console.log('Items after deleting', this.users.length.toFixed());
    return true;
  }
}
