import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserDto } from './dto/user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({
    type: UserDto,
    examples: {
      valid: {
        summary: 'Valid example',
        value: { username: 'testuser', password: 'testpassword' },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'User registered successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Username already exists or invalid data.',
  })
  async register(@Body() userDto: UserDto) {
    return this.authService.register(userDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login a user and get a JWT' })
  @ApiBody({
    type: UserDto,
    examples: {
      valid: {
        summary: 'Valid example',
        value: { username: 'testuser', password: 'testpassword' },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'JWT token returned',
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid username or password.',
  })
  async login(@Body() userDto: UserDto) {
    return this.authService.login(userDto);
  }
}
