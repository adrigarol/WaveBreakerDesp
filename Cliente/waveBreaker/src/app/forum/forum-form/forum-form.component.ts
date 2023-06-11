import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ForumService } from '../services/forum.service';
import { Post } from '../interfaces/post.interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'wb-forum-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './forum-form.component.html',
  styleUrls: ['./forum-form.component.css']
})
export class ForumFormComponent implements OnInit {


  formForum!:FormGroup;
  postTitleControl!:FormControl<string>;
  descriptionControl!:FormControl<string>;
  saved=false;

  constructor(
    private fb: NonNullableFormBuilder,
    private readonly forumService: ForumService,
    private readonly userService: AuthService,
    private readonly router: Router,

  ){
  }

  ngOnInit(): void {
    this.postTitleControl=this.fb.control('',[
      Validators.required
    ]);
    this.descriptionControl=this.fb.control('',[
      Validators.required,
    ]);

    this.formForum=this.fb.group({
      postTitle: this.postTitleControl,
      description: this.descriptionControl,
    });
  }

  canDeactivate() {
    if (this.formForum.dirty && !this.saved){
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
      return true;
    }
  }

  addPost() {
    this.userService.getUserById().subscribe({
      next:(creator)=>{
        const post:Post ={
          title: this.postTitleControl.value,
          description: this.descriptionControl.value,
          comments: [],
          user: creator
        };
        this.forumService.createPost(post).subscribe({
          next:()=>{
            this.saved=true;
            this.router.navigate(['/forum']);
          }
        });
      }
    })
  }

  validClasses(control: FormControl, validClass: string, errorClass: string){
    return{
      [validClass]: control.touched && control.valid,
      [errorClass]: control.touched && control.invalid
    }
  }

}
