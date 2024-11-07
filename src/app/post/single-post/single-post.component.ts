import { Component, OnInit } from '@angular/core';
import { Post } from '../models/single-post.model';
import { CommonModule } from '@angular/common';
import { CommentsPreviewComponent } from '../comments-preview/comments-preview.component';
import { PostModule } from '../post.module';

@Component({
  selector: 'app-single-post',
  standalone: true,
  imports: [
    CommentsPreviewComponent,
    PostModule,
    CommonModule
  ],
  templateUrl: './single-post.component.html',
  styleUrl: './single-post.component.css'
})
export class SinglePostComponent implements OnInit {

  post: Post;
  isLiked: boolean = false;


  constructor() {
    this.post = {
      id: 0,
      imageUrl: '',
      description: '',
      likes: 0,
      date: new Date()
    };
  }

  ngOnInit(): void {
    this.post = {
      id: 1,
      imageUrl: 'https://example.com/image.jpg',
      description: 'Ovo je opis objave',
      likes: 120,
      date: new Date()
    };
  }

  likePost(): void{
    this.isLiked = !this.isLiked; // Toggle stanje lajkovanja
  }

}
