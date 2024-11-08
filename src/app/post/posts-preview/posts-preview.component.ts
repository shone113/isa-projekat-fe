import { Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { SinglePostComponent } from '../single-post/single-post.component';
import { HttpClientModule } from '@angular/common/http';
import { Post } from '../models/single-post.model';
import { PostService } from '../post.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

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
  constructor(private router: Router, private http: HttpClient){}


  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void{
    this.http.get<Post[]>(`http://localhost:8080/api/post`).subscribe({
      next: (response) =>{
        this.posts = response;
        console.log(this.posts);
      }
    })
  }

  removePost(id: number): void {
    this.posts = this.posts.filter(post => post.id !== id);
  }
}