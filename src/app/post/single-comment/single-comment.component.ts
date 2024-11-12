import { Component, Input } from '@angular/core';
import { Comment } from '../models/comment.model'
import { Router } from '@angular/router';
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

  ngOnInit(): void{
  }
  constructor(private router: Router){}
  viewProfile() {
    this.router.navigate(["profile"])
  }
}
