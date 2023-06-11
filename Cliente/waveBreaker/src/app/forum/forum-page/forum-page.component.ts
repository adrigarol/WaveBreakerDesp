import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from '../interfaces/post.interface';
import { ForumService } from '../services/forum.service';
import { NonNullableFormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { User } from 'src/app/users/interfaces/user.interface';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'wb-forum-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './forum-page.component.html',
  styleUrls: ['./forum-page.component.css']
})
export class ForumPageComponent implements OnInit {

  posts!:Post[];
  user!:User;
  constructor(
    private readonly router: Router,
    private fb: NonNullableFormBuilder,
    private readonly forumService:  ForumService,
    private readonly userService:  AuthService,
    private readonly route: ActivatedRoute,


  ){
  }

  ngOnInit(): void {
    this.forumService.getAll().subscribe({
      next: (result)=>{
        this.posts=result;
      }
    });
    this.userService.getUserById().subscribe(result=>this.user=result);
  }

  deletePost(post: Post){
    this.posts=this.posts.filter(p=> p!=post);
    this.forumService.deletePost(post._id).subscribe();
  }
}
