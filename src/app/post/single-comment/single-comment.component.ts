import { Component, Input } from '@angular/core';
import { Comment } from '../models/single-post.model';

@Component({
  selector: 'app-single-comment',
  standalone: true,
  imports: [

  ],
  templateUrl: './single-comment.component.html',
  styleUrl: './single-comment.component.css'
})
export class SingleCommentComponent {
    @Input() comment: Comment | undefined;

}
