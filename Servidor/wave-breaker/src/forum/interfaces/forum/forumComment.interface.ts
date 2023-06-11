/* eslint-disable prettier/prettier */
import { User } from 'src/user/interfaces/user/user.interface';

export interface ForumComment {
  description: string;
  user: User;
}
