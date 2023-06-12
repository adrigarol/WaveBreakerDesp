import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Post } from "../interfaces/post.interface";

@Injectable({
  providedIn: 'root',
})

export class ForumService{
  constructor(private readonly http: HttpClient){}

  getAll(): Observable<Post[]>{
    return this.http
    .get<Post[]>('forum');
  }

  getById(id: number): Observable<Post>{
    return this.http.get<Post>(`forum/${id}`);
  }

  createPost(post: Post): Observable<Post>{
    return this.http
      .post<Post>('forum', post);
  }

  updatePost(post: Post, id?: number): Observable<Post>{
    return this.http
    .put<Post>(`forum/${id}`, post);
  }

  deletePost(id?: number): Observable<Post>{
    return this.http
      .delete<Post>(`forum/${id}`);
  }
}
