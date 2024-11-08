import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from './models/single-post.model';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  // constructor(private http: HttpClient,  private tokenStorage: TokenStorage) { }
  constructor(private http: HttpClient, private router: Router) { }

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>('http://localhost:8080/api/post');
  }



}
