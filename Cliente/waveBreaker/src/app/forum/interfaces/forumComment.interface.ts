import { User } from "src/app/users/interfaces/user.interface";

export interface ForumComment {
  _id?: number;
  description: string;
  user: User;
}
