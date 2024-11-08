import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleCommentComponent } from './single-comment/single-comment.component';
import { CommentFormComponent } from './comment-form/comment-form.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SinglePostComponent } from './single-post/single-post.component';
import { PostsPreviewComponent } from './posts-preview/posts-preview.component';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule
    ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Dodaj CUSTOM_ELEMENTS_SCHEMA

})
export class PostModule { }