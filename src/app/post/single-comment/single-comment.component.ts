import { Component, Input } from '@angular/core';
import { Comment } from '../models/comment.model'
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
    console.log("Maliiiiiiiiiii komentar: ", this.comment);
  }
}
