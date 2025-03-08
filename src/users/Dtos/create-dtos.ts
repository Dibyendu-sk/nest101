import { IsEmail, IsNotEmpty } from 'class-validator';
export class UserDto {
  id: string;
  username: string;
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
}
export class CreateUserResponse {
  message: string;
  totalUsers: number;
}
