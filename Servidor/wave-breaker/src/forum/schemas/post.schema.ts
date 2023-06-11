/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';
import { CommentSchema } from './coment.schema';
import { UserSchema } from 'src/user/schemas/user.schema';

const UserSch=mongoose.model('user', UserSchema);


export const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description:{
    type: String,
  },
  comments: [CommentSchema],
  user:{
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: UserSch
  }
});
