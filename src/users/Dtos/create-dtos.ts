import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class UserDto {
  id: string;
  @ApiProperty()
  username: string;
  @IsEmail()
  @ApiProperty()
  email: string;
  @IsNotEmpty()
  @ApiProperty()
  password: string;
}
export class CreateUserResponse {
  @ApiProperty()
  message: string;
  @ApiProperty()
  totalUsers: number;
}
