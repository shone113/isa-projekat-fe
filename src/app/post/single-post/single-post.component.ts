import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Post } from '../models/single-post.model';
import { CommonModule } from '@angular/common';
import { PostModule } from '../post.module';
import { SingleCommentComponent } from '../single-comment/single-comment.component';
import { CommentFormComponent } from '../comment-form/comment-form.component';
import { Input } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { Comment } from '../models/comment.model';
import { UpdatePostFormComponent } from '../update-post-form/update-post-form.component';
import { jwtDecode } from "jwt-decode";

@Component({
  selector: 'app-single-post',
  standalone: true,
  imports: [
    CommonModule,
    SingleCommentComponent,
    CommentFormComponent,
    CommonModule,
    UpdatePostFormComponent
  ],
  templateUrl: './single-post.component.html',
  styleUrl: './single-post.component.css'
})
export class SinglePostComponent implements OnInit, OnChanges {
  // post: Post;
  @Input() post!: Post;
  comments: Comment[] = [];
  isLiked: boolean = false;
  showCommentSection: boolean = true;
  @Output() postDeleted = new EventEmitter<number>();
  profileId: number = 1;
  showEditForm: boolean = false;
  @Output() postUpdated = new EventEmitter<void>();
  userId: number | null = null;
  loggedProfileId: number | null = null;

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

    this.isLiked = this.post.liked;
    console.log("LLLLLIIIIIIIIIIIIKKKKKKKKEEEEEEE: ", this.post.liked);

    const token = localStorage.getItem('jwt');
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        this.loggedProfileId = decodedToken.profileId;
        // this.userId = decodedToken.user.id;
        console.log("EVOOOOOO MEEEEEE EEEEEEJJJJJJJJ   ", decodedToken);
      } catch (e) {
        console.error('Greška pri dekodiranju tokena:', e);
      }
    }

  }

  likePost(): void{
    this.isLiked = !this.isLiked;
    const token = localStorage.getItem('jwt');
    const headers = new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : ''
    });
    if(this.isLiked){
      this.http.put<Post>(`http://localhost:8080/api/post/like/${this.post.id}?profileId=${this.profileId}`, null, {headers}).subscribe({
        next: (response) => {
          this.post = response;
        },
        error: (err) => {
          alert("You are need to login!")
          console.error('Greška pri lajkovanju:', err);
        }
      });
    }else{
      this.http.put<Post>(`http://localhost:8080/api/post/unlike/${this.post.id}?profileId=${this.profileId}`, null, {headers}).subscribe({
        next: (response) => {
          this.post = response;
        },
        error: (err) => {
          alert("You are need to login!")
          console.error('Greška pri lajkovanju:', err);
        }
      });
    }
  }

  editPost(): void{
    this.showEditForm = !this.showEditForm;
  }

  deletePost(id: number): void{
    const token = localStorage.getItem('jwt');
    const headers = new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : ''
    });
    this.http.delete<Post[]>(`http://localhost:8080/api/post/` + id, {headers}).subscribe({
      next: (response) =>{
        this.postDeleted.emit(id); // Emituje ID izbrisanog posta

      }
    })
  }


  onReloadComments(): void {
    this.http.get<Comment[]>(`http://localhost:8080/api/comment/by-post-id/${this.post.id}`).subscribe({
      next: (response) => {
        this.comments = response;
      },
      error: (err) => {
        console.error('Greška pri učitavanju komentara:', err);
      }
    });
    this.router.navigate([this.router.url]);
  }

  onToggleUpdateMenu(): void{
    this.showEditForm = !this.showEditForm;
  }

  onPostUpdated() {
    console.log("EVO ME NA LAPO");
    this.postUpdated.emit();
  }

  viewProfile() {
    this.router.navigate(["profile"])
  }

}
