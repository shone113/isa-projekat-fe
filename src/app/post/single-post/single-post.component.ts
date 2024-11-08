import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Post } from '../models/single-post.model';
import { CommonModule } from '@angular/common';
import { PostModule } from '../post.module';
import { SingleCommentComponent } from '../single-comment/single-comment.component';
import { CommentFormComponent } from '../comment-form/comment-form.component';
import { Input } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
@Component({
  selector: 'app-single-post',
  standalone: true,
  imports: [
    PostModule,
    CommonModule,
    SingleCommentComponent,
    CommentFormComponent,
    HttpClientModule,
    CommonModule
  ],
  templateUrl: './single-post.component.html',
  styleUrl: './single-post.component.css'
})
export class SinglePostComponent implements OnInit, OnChanges {

  // post: Post;
  @Input() post!: Post;  // Ovdje primaš post podatke
  isLiked: boolean = false;
  showCommentSection: boolean = true;
  @Output() postDeleted = new EventEmitter<number>(); // Emituje ID izbrisanog posta

  constructor(private router: Router, private http: HttpClient){}

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {

  }

  likePost(): void{
    this.isLiked = !this.isLiked;
    if(this.isLiked){

    }else{

    }
  }

  editPost(): void{

  }

  deletePost(id: number): void{
    this.http.delete<Post[]>(`http://localhost:8080/api/post/` + id).subscribe({
      next: (response) =>{
        console.log("OVAJ ID BRISEEM", id);
        console.log(response);
        this.postDeleted.emit(id); // Emituje ID izbrisanog posta

      }
    })
  }
}
