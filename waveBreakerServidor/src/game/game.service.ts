import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GameDto } from './dto/game-dto/game-dto';
import { Game } from './interfaces/game/game.interface';

@Injectable()
export class GameService {
  constructor(
    @InjectModel('Game')
    private readonly gameModel: Model<Game>,
  ) {}
  async get(): Promise<Game[]> {
    return await this.gameModel.find().exec();
  }

  async getId(id: string): Promise<Game> {
    return await this.gameModel.findById(id).exec();
  }

  async createGame(newGame: GameDto): Promise<Game> {
    const result = new this.gameModel(newGame);
    return await result.save();
  }

  async getCurrentGame(game: GameDto): Promise<Game> {
    return await game;
  }

  async updateGame(id: string, game: GameDto): Promise<Game> {
    return await this.gameModel
      .findByIdAndUpdate(
        id,
        {
          $set: {
            coins: game.coins,
            userId: game.userId,
            upgrades: game.upgrades,
            enemiesDefeated: game.enemiesDefeated,
            gamesPlayed: game.gamesPlayed,
            victories: game.victories,
            totalCoins: game.totalCoins,
          },
        },
        { new: true, runValidators: true },
      )
      .exec();
  }
}
