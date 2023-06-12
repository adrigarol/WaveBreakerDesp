import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ForumService } from './forum.service';
import { PostDto } from './dto/forum-dto/post-dto';
import { JwtAuthGuard } from 'src/user/jwt-user.guard';
import { UserService } from 'src/user/user.service';

@Controller('forum')
export class ForumController {
  constructor(
    private readonly forumService: ForumService,
    private readonly userService: UserService,
  ) {}

  @Get()
  async getPosts() {
    try {
      const result = await this.forumService.get();
      const ps: PostDto[] = [];
      for (let i = 0; i < result.length; i++) {
        const ruser = await this.userService.getUser(result[i].user._id);
        const p = new PostDto();
        p._id = result[i]._id;
        p.title = result[i].title;
        p.description = result[i].description;
        p.comments = result[i].comments;
        for (let j = 0; j < result[i].comments.length; j++) {
          p.comments[j].user = await this.userService.getUser(
            result[i].comments[j].user._id,
          );
        }
        p.user = ruser;
        ps.push(p);
      }
      return ps;
    } catch (error) {
      console.log(error);
    }
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updatePost(@Param('id') id: string, @Body() updatedPost: PostDto) {
    await this.forumService.updatePost(id, updatedPost);
  }

  @Get(':id')
  async getPost(@Param('id') id: string) {
    try {
      const result = await this.forumService.getId(id);
      const ruser = await this.userService.getUser(result.user._id);

      const p = new PostDto();
      p._id = result._id;
      p.title = result.title;
      p.description = result.description;
      p.comments = result.comments;
      for (let j = 0; j < result.comments.length; j++) {
        p.comments[j].user = await this.userService.getUser(
          result.comments[j].user._id,
        );
      }
      p.user = ruser;
      return p;
    } catch (error) {
      console.log(error);
    }
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createPost(@Body() newPost: PostDto) {
    return this.forumService.createPost(newPost);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string) {
    try {
      const result = await this.forumService.delete(id);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}
