import { Routes } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { HomePageComponent } from './user/home-page/home-page.component';
import { SinglePostComponent } from './post/single-post/single-post.component';
import { PostsPreviewComponent } from './post/posts-preview/posts-preview.component';
import { AllUsersComponent } from './auth/all-users/all-users.component';
import { ProfileComponent } from './user/profile/profile.component';
import { TrendsComponent } from './user/trends/trends.component';
import { AdminHomepageComponent } from './auth/admin-homepage/admin-homepage.component';
import { AdminAnalyticsComponent } from './auth/admin-analytics/admin-analytics.component';
import { MessagesPreviewComponent } from './user/messages-preview/messages-preview.component';
import { MapComponent } from './layout/map/map.component';
import { PostsMapComponent } from './user/posts-map/posts-map.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'single-post', component: SinglePostComponent},
  { path: 'single-post', component: SinglePostComponent},
  { path: 'posts-preview', component: PostsPreviewComponent },
  { path: 'home', component: PostsPreviewComponent },
  { path: 'all-users', component: AllUsersComponent},
  { path: 'profile/:id', component: ProfileComponent},
  { path: 'trends', component: TrendsComponent},
  { path: 'admin-homepage', component: AdminHomepageComponent},
  { path: 'analytics', component: AdminAnalyticsComponent},
  { path: 'messages', component: MessagesPreviewComponent},
  { path: 'map', component: PostsMapComponent}
];
