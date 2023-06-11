import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomBytes, scryptSync } from 'crypto';
import { UserDto } from './dto/user-dto/user-dto';
import { UserService } from './user.service';
import { JwtAuthGuard } from './jwt-user.guard';

@Controller('auth')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Get()
  async getUsers() {
    const result = await this.userService.getUsers();
    return result;
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getCurrentUser(@Req() req) {
    const result = await this.userService.getUser(req.user.user);
    return result;
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    try {
      const result = await this.userService.getUser(id);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  @Post()
  async createUser(@Body() newUser: UserDto) {
    try {
      newUser.password = this.encryptPassword(newUser.password);
      return this.userService.create(newUser);
    } catch (error) {
      console.log(error);
    }
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async edit(@Param('id') id: string, @Body() userDto: UserDto) {
    userDto.password = this.encryptPassword(userDto.password);
    return await this.userService.edit(id, userDto);
  }

  @Put('current/:id')
  async editUnity(@Param('id') id: string, @Body() userDto: UserDto) {
    return await this.userService.edit(id, userDto);
  }

  @Post('login')
  async login(@Body() userDto: UserDto) {
    const result = await this.userService.login(userDto);
    return result;
  }

  @Post('loginUnt')
  async loginUnt(@Body() userDto: UserDto) {
    const result = await this.userService.loginUnt(userDto);
    return result;
  }

  encryptPassword(password: string) {
    const salt = randomBytes(16).toString('hex');
    const hashedPassword = scryptSync(password, salt, 64).toString('hex');
    password = `${salt}:${hashedPassword}`;
    return password;
  }
}
