import { Routes } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { SinglePostComponent } from './post/single-post/single-post.component';
import { PostsPreviewComponent } from './post/posts-preview/posts-preview.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'single-post', component: SinglePostComponent},
  { path: 'posts-preview', component: PostsPreviewComponent }
];
