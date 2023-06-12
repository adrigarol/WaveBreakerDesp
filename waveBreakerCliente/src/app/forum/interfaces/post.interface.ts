import { User } from "src/app/users/interfaces/user.interface";
import { ForumComment } from "./forumComment.interface";

export interface Post {
  _id?: number;
  title: string;
  description: string;
  comments: ForumComment[];
  user: User;
}
