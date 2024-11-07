import { Routes } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { HomePageComponent } from './user/home-page/home-page.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomePageComponent}
];
