import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { User } from '../users/interfaces/user.interface';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'wb-menu',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{
  user!:User;
  constructor(
    private readonly userService: AuthService,
    private readonly router: Router,
  ){
  }
  ngOnInit(): void {
   return;
  }

  isLogged(): boolean{
    if(localStorage.getItem('token')){
      return true;
    }
    return false;
  }

  logout(): void{
    this.userService.logout();
    this.router.navigate(['/auth/login']);
  }

}
