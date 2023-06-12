import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from 'src/app/users/interfaces/user.interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'wb-user-ranking',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './user-ranking.component.html',
  styleUrls: ['./user-ranking.component.css']
})
export class UserRankingComponent implements OnInit{

  users!:User[];

  constructor(
    private readonly userService: AuthService,
  ){}

  ngOnInit(): void {
    this.userService.getUsers().subscribe(result=>{
      this.users=result;
      this.users.sort((a, b) => (a.level > b.level ? -1 : 1));
    });
  }

}
