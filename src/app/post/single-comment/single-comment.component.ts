import { Component, Input } from '@angular/core';
import { Comment } from '../models/comment.model'
import { Router } from '@angular/router';
import { Post } from '../models/single-post.model';
import { HttpClient } from '@angular/common/http';
import { Profile } from '../../user/models/profile.model';
@Component({
  selector: 'app-single-comment',
  standalone: true,
  imports: [

  ],
  templateUrl: './single-comment.component.html',
  styleUrl: './single-comment.component.css'
})
export class SingleCommentComponent {
  @Input() comment!: Comment;
  profileId: number = 0;

  constructor(private router: Router, private http: HttpClient){}

  ngOnInit(): void{
    this.http.get<Profile>(`http://localhost:8080/api/profile/user?id=${this.comment.creatorId}`).subscribe({
      next: (res: Profile) => {
        this.profileId = res.id;
      }
    })
  }
  
  viewProfile() {
    this.router.navigate([`profile/${this.profileId}`])
  }
}
