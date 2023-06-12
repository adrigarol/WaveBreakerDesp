import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from 'src/app/users/interfaces/user.interface';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Game } from 'src/app/game/interfaces/game';
import { GameService } from 'src/app/game/services/game.service';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'wb-profile',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  user!:User;
  game!:Game;
  me=false;
  constructor(
    private readonly route: ActivatedRoute,
    private readonly gameService: GameService,
    private readonly userService: AuthService,
  ){

  }

  ngOnInit(): void {
    this.route.data.subscribe({
      next: (data) =>{
        this.route.params.subscribe(params=>{
          if(params['id']=='me'){
            this.me=true;
          }
        })
        this.user = data['user'];
        this.gameService.getByUserId(this.user._id).subscribe(res=>this.game=res);
      }
    });
  }
}
