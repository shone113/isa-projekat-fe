import { Component } from '@angular/core';

@Component({
  selector: 'app-comment-form',
  standalone: true,
  imports: [],
  templateUrl: './comment-form.component.html',
  styleUrl: './comment-form.component.css'
})
export class CommentFormComponent {
  comments = [
    { author: 'John Doe', content: 'Great post!', date: new Date() },
    { author: 'Jane Smith', content: 'Very informative, thanks!', date: new Date() }
  ];

  addComment(newComment: string) {
    const comment = { author: 'Anonymous', content: newComment, date: new Date() };
    this.comments.push(comment);
  }
}
