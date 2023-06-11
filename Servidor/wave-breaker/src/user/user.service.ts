import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { scryptSync, timingSafeEqual } from 'crypto';
import { Model } from 'mongoose';
import { UserDto } from './dto/user-dto/user-dto';
import { User, UserLogin } from './interfaces/user/user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async getUsers(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async getUser(id: string): Promise<User> {
    return await this.userModel.findById(id).exec();
  }

  async loginUnt(user: UserLogin): Promise<User> {
    const users = await this.getUsers();

    let i = 0;
    let found = false;
    let userFound: User = null;
    while (!found && i < users.length) {
      if (users[i].email === user.email) {
        userFound = users[i];
        found = true;
      }
      i++;
    }
    if (userFound) {
      const [salt, key] = userFound.password.split(':');
      const hashedBuffer = scryptSync(user.password, salt, 64);
      const keyBuffer = Buffer.from(key, 'hex');
      const match = timingSafeEqual(hashedBuffer, keyBuffer);
      if (match) {
        return userFound;
      } else {
        throw new UnauthorizedException({
          status: HttpStatus.UNAUTHORIZED,
          error: 'Wrong user or password',
        });
      }
    } else {
      throw new UnauthorizedException({
        status: HttpStatus.UNAUTHORIZED,
        error: 'Wrong user or password',
      });
    }
  }

  async login(user: UserLogin) {
    const userFound = await this.loginUnt(user);
    if (userFound) {
      const payload = { sub: userFound._id };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
  }

  // async loginUnity(user: UserLogin) {s}

  async create(createUser: UserDto): Promise<User> {
    const newUser = new this.userModel(createUser);
    return await newUser.save();
  }

  async edit(id: string, editedUser: UserDto): Promise<User> {
    return await this.userModel
      .findByIdAndUpdate(
        id,
        {
          $set: {
            userName: editedUser.userName,
            email: editedUser.email,
            password: editedUser.password,
            avatar: editedUser.avatar,
            level: editedUser.level,
            exp: editedUser.exp,
            maxExp: editedUser.maxExp,
          },
        },
        { new: true, runValidators: true },
      )
      .exec();
  }
}
