import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLogin } from '../../users/interfaces/user.interface';
import { AuthService } from '../services/auth.service';
import { TokenResponse } from '../interfaces/responses';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { GameService } from 'src/app/game/services/game.service';
import { FormGroup, ReactiveFormsModule, FormControl, NonNullableFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'wb-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, RouterOutlet], //RouterOutlet deberá ir en el menú para poder cargar los componentes de cada ruta
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  formLogin!:FormGroup;
  passwordControl!:FormControl<string>;
  emailControl!:FormControl<string>;

  errorLogin=false;

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private fb: NonNullableFormBuilder,
    private readonly gameService: GameService
  ){
  }



  ultimateToken?: TokenResponse;
  ngOnInit(): void {
    this.emailControl=this.fb.control('',[
      Validators.required,
      Validators.email,
    ]);
    this.passwordControl=this.fb.control('',[
      Validators.required
    ]);

    this.formLogin=this.fb.group({
      email:this.emailControl,
      password:this.passwordControl
    });
    return;
  }

  login(): void{
    const userLogin:UserLogin={
      email:this.emailControl.value,
      password:this.passwordControl.value,
    };
    this.authService.login(userLogin).subscribe({
      next: (token) => {
        localStorage.setItem('token', token.access_token);
        this.router.navigate(['/users/me']);
      },

      error: () => this.errorLogin=true,
    })
  }


  validClasses(control: FormControl, validClass: string, errorClass: string){
    return{
      [validClass]: control.touched && control.valid,
      [errorClass]: control.touched && control.invalid
    }
  }

}
