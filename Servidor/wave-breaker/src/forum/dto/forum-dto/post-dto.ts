import { User } from 'src/user/interfaces/user/user.interface';
import { ForumComment } from 'src/forum/interfaces/forum/forumComment.interface';

export class PostDto {
  _id?: string;
  title: string;
  description: string;
  comments: ForumComment[];
  user: User;
}
