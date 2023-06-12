/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';
export const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  role: {
    type: String,
    enum: ['ADMIN', 'USER'],
  },
  level:{
    type: Number,
    required: true,
    min: 1,
    max: 99
  },
  exp:{
    type: Number,
    required: true,
    min: 1,
  },
  maxExp:{
    type: Number,
    required: true,
    min:1,
  },

});
