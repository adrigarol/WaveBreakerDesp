import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './interfaces/forum/post.interface';
import { Model } from 'mongoose';
import { PostDto } from './dto/forum-dto/post-dto';

@Injectable()
export class ForumService {
  constructor(
    @InjectModel('Post')
    private readonly postModel: Model<Post>,
  ) {}
  async get(): Promise<Post[]> {
    return await this.postModel.find().exec();
  }

  async createPost(newPost: PostDto): Promise<Post> {
    const result = new this.postModel(newPost);
    return await result.save();
  }

  async getId(id: string): Promise<Post> {
    return await this.postModel.findById(id).exec();
  }

  async updatePost(id: string, post: PostDto): Promise<Post> {
    return await this.postModel
      .findByIdAndUpdate(
        id,
        {
          $set: {
            title: post.title,
            description: post.description,
            comments: post.comments,
            user: post.user,
          },
        },
        { new: true, runValidators: true },
      )
      .exec();
  }

  async delete(id: string) {
    return await this.postModel.findByIdAndDelete(id).exec();
  }
}
