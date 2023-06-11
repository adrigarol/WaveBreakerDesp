import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ForumService } from '../services/forum.service';
import { Post } from '../interfaces/post.interface';
import { User } from 'src/app/users/interfaces/user.interface';
import { FormControl, FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ForumComment } from '../interfaces/forumComment.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'wb-post-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  post!:Post;
  user!:User;

  formComment!:FormGroup;
  commentControl!:FormControl<string>;
  saved=false;

  constructor(
    private readonly userService:AuthService,
    private readonly forumService: ForumService,
    private readonly route: ActivatedRoute,
    private fb: NonNullableFormBuilder,
    ) {}

  ngOnInit(): void {
    this.commentControl=this.fb.control('',[
      Validators.required
    ]);

    this.formComment=this.fb.group({
      comment: this.commentControl,
    });

    this.route.params.subscribe(params=>{
      this.forumService.getById(params['id']).subscribe(result=>this.post=result);
      this.userService.getUserById().subscribe(result=>this.user=result);
    })
  }

  addComment(post: Post, user:User) {
    const comment: ForumComment={
      description: this.commentControl.value,
      user: user
    };

    post.comments.push(comment);
    this.forumService.updatePost(post, post._id).subscribe();
    this.saved=true;
    this.formComment.reset();
    this.saved=false;
  }


  canDeactivate() {
    if (this.formComment.dirty && !this.saved){
      return Swal.fire({background: '#130e53',
      color: '#fff',
      title:"¿Seguro que quieres salir?.",
      text:"Se perderán los cambios",
      icon:"question",
      iconColor: '#f0ed31',
      showDenyButton:true}).then((result)=> {
        if(result.value){
          return true;
        }
        else{
          return false;
        }
      })
    } else{
      this.saved=false;
      return true;
    }
  }

  deletePost(){
    this.forumService.deletePost(this.post._id).subscribe();
  }

  deleteComment(post: Post, comment: ForumComment){
    post.comments=post.comments.filter(c=> c!==comment);
    this.forumService.updatePost(post, post._id).subscribe();
  }

  validClasses(control: FormControl, validClass: string, errorClass: string){
    return{
      [validClass]: control.touched && control.valid,
      [errorClass]: control.touched && control.invalid
    }
  }

}
