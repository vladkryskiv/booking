import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class UserDto {
  @ApiProperty({ example: 'testuser', description: 'Username of the user' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'testpassword', description: 'Password of the user' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
