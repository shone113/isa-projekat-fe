import { Routes } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { HomePageComponent } from './user/home-page/home-page.component';
import { SinglePostComponent } from './post/single-post/single-post.component';
import { PostsPreviewComponent } from './post/posts-preview/posts-preview.component';
import { AllUsersComponent } from './auth/all-users/all-users.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'single-post', component: SinglePostComponent},
  { path: 'single-post', component: SinglePostComponent},
  { path: 'posts-preview', component: PostsPreviewComponent },
  { path: 'home', component: PostsPreviewComponent },
  { path: 'all-users', component: AllUsersComponent}
];
