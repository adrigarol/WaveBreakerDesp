/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';
import { UserSchema } from 'src/user/schemas/user.schema';



export const CommentSchema = new mongoose.Schema({
  description:{
    type: String,
  },
  user: UserSchema
});
