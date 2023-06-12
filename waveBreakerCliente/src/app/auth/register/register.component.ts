import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { Game } from 'src/app/game/interfaces/game';
import { GameService } from 'src/app/game/services/game.service';
import { User } from '../../users/interfaces/user.interface';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormControl, NonNullableFormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';


@Component({
  selector: 'wb-register',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, ReactiveFormsModule, SweetAlert2Module],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  formRegister!:FormGroup;
  userNameControl!:FormControl<string>;
  emailControl!:FormControl<string>;
  emailControl2!:FormControl<string>;
  passwordControl!:FormControl<string>;
  latControl!:FormControl<string>;
  lngControl!:FormControl<string>;
  avatarControl!:FormControl<string>;
  latitude=37;
  longitude=-0.5;
  saved=false;
  edit=false;
  newUser:User={
    userName:'',
    email:'',
    password:'',
    avatar:'',
    role: 'USER',
    level:1,
    exp:1,
    maxExp:500,
  };



  constructor(
    private readonly router: Router,
    private fb: NonNullableFormBuilder,
    private readonly authService:AuthService,
    private readonly gameService: GameService,
    private readonly route: ActivatedRoute,


  ){
    this.newUser=this.resetUser();
  }

  ngOnInit() : void{
    this.userNameControl=this.fb.control('',[
      Validators.required
    ]);
    this.passwordControl=this.fb.control('',[
      Validators.required,
      Validators.pattern(/.{4,}/)
    ]);
    this.emailControl=this.fb.control('',[
      Validators.required,
      Validators.email
    ]);
    this.latControl=this.fb.control('',[
      Validators.required
    ]);
    this.lngControl=this.fb.control('',[
      Validators.required
    ]);
    this.emailControl=this.fb.control('',[
      Validators.required
    ])
    this.avatarControl=this.fb.control('',[
      Validators.required
    ]);

    this.formRegister=this.fb.group({
      userName: this.userNameControl,
      emailGroup: this.fb.group({
        email:this.emailControl,
      },),
      password: this.passwordControl,
      avatar: this.avatarControl
    });

    if(this.route.snapshot.routeConfig?.path=="edit"){
      this.edit=true;
      this.authService.getUserById().subscribe(us=> {
        this.newUser=us;
        this.userNameControl.setValue(this.newUser.userName);
        this.emailControl.setValue(this.newUser.email);
      });
    }
    else{
      this.edit=false;
      this.resetUser();
    }
    return;
  }

  addUser(){
    this.newUser.userName=this.userNameControl.value;
    this.newUser.email=this.emailControl.value;
    this.newUser.password=this.passwordControl.value;

    if(!this.edit){
      this.authService.register(this.newUser).subscribe({
        next: (user) => {
          const upgrades=[1,1,1,1,1,1];
          const game: Game={
            coins: 100,
            userId: user._id,
            upgrades: upgrades,
            enemiesDefeated: 0,
            gamesPlayed: 0,
            victories: 0,
            totalCoins: 100,
          }


      this.gameService.createGame(game).subscribe({
        next:() =>{
          this.saved=true;
          this.success("Usuario registrado correctamente");
          this.router.navigate(['/auth/login']);
        },
        error: (error: unknown) => console.error(error),
      });

      },
      });
    }

    else{
      this.authService.edit(this.newUser).subscribe({
        next:()=>{
          this.saved=true;
          this.success("Usuario editado correctamente")
          this.router.navigate(['users/me']);
        },
        error: (error: unknown) => console.error(error),
      });
    }

  }

  success(message: string) {
    Swal.fire({
      icon: 'success',
      title: message,
      background: '#130e53',
      color: '#fff',
      showConfirmButton: false,
      timer: 1500
    })
  }

  canDeactivate() {
    if (this.formRegister.dirty && !this.saved){
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

  changeImage(fileInput: HTMLInputElement) {
    if (!fileInput.files || fileInput.files.length === 0) {
      return;
    }
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(fileInput.files[0]);
    reader.addEventListener('loadend', () => {
      this.newUser.avatar = reader.result as string;
    });
  }


  validClasses(control: FormControl, validClass: string, errorClass: string){
    return{
      [validClass]: control.touched && control.valid,
      [errorClass]: control.touched && control.invalid
    }
  }

  resetUser(){
    return{
      userName:'',
      email: '',
      password:'',
      avatar: '',
      role: 'USER',
      level:1,
      exp:1,
      maxExp:500,
  };
}


}
