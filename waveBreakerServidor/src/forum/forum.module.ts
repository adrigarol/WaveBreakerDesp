import { Module } from '@nestjs/common';
import { ForumController } from './forum.controller';
import { ForumService } from './forum.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema } from './schemas/post.schema';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Post', schema: PostSchema }]),
    UserModule,
  ],
  controllers: [ForumController],
  providers: [ForumService, UserModule],
})
export class ForumModule {}
