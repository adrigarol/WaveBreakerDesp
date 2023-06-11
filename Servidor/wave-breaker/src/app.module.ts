import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { GameModule } from './game/game.module';
import { UserModule } from './user/user.module';
import { ForumModule } from './forum/forum.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/waveBreaker'),
    GameModule,
    UserModule,
    ForumModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
