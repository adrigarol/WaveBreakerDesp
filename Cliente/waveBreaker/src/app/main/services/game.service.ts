import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Game } from "../interfaces/game";
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})

export class GameService{
  constructor(private readonly http: HttpClient){}

  getAll(): Observable<Game[]>{
    return this.http
    .get<Game[]>('game');
  }

  createGame(game: Game): Observable<Game>{
    return this.http
    .post<Game>('game', game);
  }

  getCurrentGame(): Observable<Game>{
    return this.http
      .get<Game>(`game/${"current"}`);
  }

  updateGame(game: Game, id?:number): Observable<Game>{
    return this.http
      .put<Game>(`game/${id}`, game);
  }

  getByUserId(id?: number): Observable<Game>{
    return this.http
      .get<Game>(`game/${"current"}/${id}`);
  }
}
