import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/user/jwt-user.guard';
import { GameDto } from './dto/game-dto/game-dto';
import { GameService } from './game.service';
import { Game } from './interfaces/game/game.interface';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getGames() {
    try {
      const result = await this.gameService.get();
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  @Get('current/:id')
  async getCurrentGameUnt(@Param('id') id: string) {
    const games = await this.getGames();
    let i = 0;
    let found = false;
    let gameFound: Game = null;
    while (!found && i < games.length) {
      if (games[i].userId.toString() === id) {
        gameFound = games[i];
        found = true;
      }
      i++;
    }
    const result = await this.gameService.getCurrentGame(gameFound);
    return result;
  }

  @Get('current')
  @UseGuards(JwtAuthGuard)
  async getCurrentGame(@Req() req) {
    const games = await this.getGames();
    let i = 0;
    let found = false;
    let gameFound: Game = null;
    while (!found && i < games.length) {
      if (games[i].userId.toString() === req.user.user) {
        gameFound = games[i];
        found = true;
      }
      i++;
    }
    const result = await this.gameService.getCurrentGame(gameFound);
    return result;
  }

  @Put(':id')
  async updateGame(@Param('id') id: string, @Body() updatedGame: GameDto) {
    await this.gameService.updateGame(id, updatedGame);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getGame(@Param('id') id: string) {
    try {
      const result = await this.gameService.getId(id);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  @Post()
  async createGame(@Body() newGame: GameDto) {
    return this.gameService.createGame(newGame);
  }
}
