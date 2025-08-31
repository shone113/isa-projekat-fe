import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleCommentComponent } from './single-comment/single-comment.component';
import { CommentFormComponent } from './comment-form/comment-form.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SinglePostComponent } from './single-post/single-post.component';
import { AddPostComponent } from './add-post/add-post.component';
import { PostsPreviewComponent } from './posts-preview/posts-preview.component';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule

    ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Dodaj CUSTOM_ELEMENTS_SCHEMA

})
export class PostModule { }
