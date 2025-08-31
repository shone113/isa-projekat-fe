import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  addPost(post: Post): Observable<Post> {
    return this.http.post<Post>('http://localhost:8080/api/post', post);
  }

  uploadImage(imageFile: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', imageFile);
    const token = localStorage.getItem("jwt") ? localStorage.getItem("jwt") : '';
              const headers = new HttpHeaders({
                'Authorization': token ? `Bearer ${token}` : ''
              });

    return this.http.post<string>('http://localhost:8080/api/image/upload', formData, { headers: headers, responseType: 'text' as 'json' });
  }

  getImage(filename: string): Observable<Blob>{
    const url = `http://localhost:8080/images/${filename}`;
    return this.http.get(url, { responseType: 'blob' });
  }

}
