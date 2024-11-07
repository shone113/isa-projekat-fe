import { Component } from '@angular/core';
import { PostModule } from '../post.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comments-preview',
  standalone: true,
  imports: [
    PostModule,
    CommonModule
  ],
  templateUrl: './comments-preview.component.html',
  styleUrl: './comments-preview.component.css'
})
export class CommentsPreviewComponent {

}
