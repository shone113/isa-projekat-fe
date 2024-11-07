import { Routes } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { SinglePostComponent } from './post/single-post/single-post.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'single-post', component: SinglePostComponent}
];
