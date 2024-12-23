import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import { UserDto } from './dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async register(userDto: UserDto): Promise<any> {
    const { username, password } = userDto;

    if (!username || !password) {
      throw new BadRequestException('Username and password are required.');
    }

    const existingUser = await this.userModel.findOne({ username });
    if (existingUser) {
      throw new BadRequestException('Username is already taken.');
    }

    try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const createdUser = new this.userModel({
        username,
        password: hashedPassword,
      });
      await createdUser.save();

      return { message: 'User registered successfully' };
    } catch (error) {
      throw new BadRequestException('Failed to register user.');
    }
  }

  async login(userDto: UserDto) {
    const { username, password } = userDto;

    const user = await this.userModel.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const payload = { username: user.username, sub: user._id };
    return { access_token: this.jwtService.sign(payload) };
  }
}
