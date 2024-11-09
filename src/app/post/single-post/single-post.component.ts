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
import { Comment } from '../models/comment.model';
import { UpdatePostFormComponent } from '../update-post-form/update-post-form.component';
@Component({
  selector: 'app-single-post',
  standalone: true,
  imports: [
    CommonModule,
    SingleCommentComponent,
    CommentFormComponent,
    HttpClientModule,
    CommonModule,
    UpdatePostFormComponent
  ],
  templateUrl: './single-post.component.html',
  styleUrl: './single-post.component.css'
})
export class SinglePostComponent implements OnInit, OnChanges {

  // post: Post;
  @Input() post!: Post;  // Ovdje primaš post podatke
  comments: Comment[] = [];
  isLiked: boolean = false;
  showCommentSection: boolean = true;
  @Output() postDeleted = new EventEmitter<number>(); // Emituje ID izbrisanog posta
  profileId: number = 1;
  showEditForm: boolean = false;

  constructor(private router: Router, private http: HttpClient){}

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {
    this.http.get<Comment[]>(`http://localhost:8080/api/comment/by-post-id/${this.post.id}`).subscribe({
      next: (response) => {
        this.comments = response;
        console.log("COM", this.comments);
      },
      error: (err) => {
        console.error('Greška pri učitavanju komentara:', err);
      }
    });
  }

  likePost(): void{
    this.isLiked = !this.isLiked;

    if(this.isLiked){
      this.http.put<Post>(`http://localhost:8080/api/post/like/${this.post.id}?profileId=${this.profileId}`, null).subscribe({
        next: (response) => {
          console.log('Post lajkovan:', response);
          this.post = response;
        },
        error: (err) => {
          console.error('Greška pri lajkovanju:', err);
        }
      });
    }else{
      this.http.put<Post>(`http://localhost:8080/api/post/unlike/${this.post.id}?profileId=${this.profileId}`, null).subscribe({
        next: (response) => {
          console.log('Post lajkovan:', response);
          this.post = response;
        },
        error: (err) => {
          console.error('Greška pri lajkovanju:', err);
        }
      });
    }
  }

  editPost(): void{
    this.showEditForm = !this.showEditForm;
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


  onReloadComments(): void {
    this.http.get<Comment[]>(`http://localhost:8080/api/comment/by-post-id//${this.post.id}`).subscribe({
      next: (response) => {
        this.comments = response;
      },
      error: (err) => {
        console.error('Greška pri učitavanju komentara:', err);
      }
    });
  }

  onToggleUpdateMenu(): void{
    console.log("Eo me");
    this.showEditForm = !this.showEditForm;
  }

}
