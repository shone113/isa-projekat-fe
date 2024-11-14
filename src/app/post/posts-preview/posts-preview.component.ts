import { Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { SinglePostComponent } from '../single-post/single-post.component';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Post } from '../models/single-post.model';
import { PostService } from '../post.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { EventEmitter } from '@angular/core';
import { jwtDecode } from "jwt-decode";

@Component({
  selector: 'app-posts-preview',
  standalone: true,
  imports: [
    SinglePostComponent,
    HttpClientModule,
    CommonModule
  ],
  templateUrl: './posts-preview.component.html',
  styleUrl: './posts-preview.component.css'
})
export class PostsPreviewComponent implements OnChanges, OnInit {

  posts: Post[] = []
  loggedProfileId = null;
  constructor(private router: Router, private http: HttpClient){}

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void{
     const token = localStorage.getItem('jwt');
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        console.log("TOKEEEEEEEEEEEEENN POOOOOSSTOJIIIIIIIII   ", decodedToken);
        this.loadPostsForLoggedUser(token);
      } catch (e) {
        console.error('Greška pri dekodiranju tokena:', e);
      }
    }else{
      console.log("TOKEEEEEEEEEEEEENN NNNNEEEEEEPOOOOOSSTOJIIIIIIIII   ", this.loggedProfileId);
      this.loadPosts();
    }
  }

  loadPosts(): void{
    this.http.get<Post[]>(`http://localhost:8080/api/post`).subscribe({
      next: (response) =>{
        this.posts = response;
      }
    })
  }

  loadPostsForLoggedUser(token: string): void{
        const headers = new HttpHeaders({
          'Authorization': token ? `Bearer ${token}` : ''
        });
        this.http.get<Post[]>(`http://localhost:8080/api/post/all-for-logged-user`, {headers}).subscribe({
          next: (response) =>{
            this.posts = response;
            console.log("**************** POST **************", response);
          }
        })
  }

  onPostUpdated() {
    console.log('Post je ažurirannnn. Ponovo učitavam postove.');
    this.loadPosts();
  }

  removePost(id: number): void {
    this.posts = this.posts.filter(post => post.id !== id);
  }
}
