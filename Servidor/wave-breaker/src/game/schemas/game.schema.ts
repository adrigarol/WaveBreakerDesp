/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';
import { UserSchema } from 'src/user/schemas/user.schema';

const UserSch=mongoose.model('user', UserSchema);

export const GameSchema = new mongoose.Schema({
  coins: {
    type: Number,
    min: 0,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: UserSch
  },
  upgrades:{
    type: [Number]
  },
  enemiesDefeated:{
    type: Number,
  },
  gamesPlayed:{
    type: Number,
  },
  victories:{
    type: Number,
  },
  totalCoins:{
    type: Number,
    min: 100,
  },
});
