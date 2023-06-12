import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TokenResponse } from "../interfaces/responses";
import { User, UserLogin } from "../../users/interfaces/user.interface";

@Injectable({
  providedIn: 'root',
})

export class AuthService{
  constructor(private readonly http: HttpClient){}

  login(user: UserLogin): Observable<TokenResponse>{
    return this.http.post<TokenResponse>('auth/login', user);
  }

  logout(): void {
    localStorage.removeItem("token");
  }

  register(user: User): Observable<User>{
    return this.http
      .post<User>('auth', user);
  }

  getUserById(id?: number):Observable<User>{
    if(id==undefined){
      return this.http
      .get<User>('auth/me');
    }
    return this.http
      .get<User>(`auth/${id}`);
  }

  edit(user:User): Observable<User>{
    return this.http
      .put<User>(`auth/${user._id}`, user);
  }

  getUsers():Observable<User[]>{
    return this.http
      .get<User[]>('auth');
  }
}
