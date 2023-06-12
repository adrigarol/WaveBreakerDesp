import { User } from 'src/user/interfaces/user/user.interface';
import { ForumComment } from './forumComment.interface';
export interface Post {
  _id?: string;
  title: string;
  description: string;
  comments: ForumComment[];
  user: User;
}
