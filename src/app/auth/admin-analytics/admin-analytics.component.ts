import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-analytics',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './admin-analytics.component.html',
  styleUrl: './admin-analytics.component.css'
})
export class AdminAnalyticsComponent {

  selectedCategory: string | null = null;
  postsOptions: boolean = false;
  commentsOptions: boolean = false;
  usersOptions: boolean = false;

  selectCategory(category: string) {
    this.selectedCategory = category;
  }

  showPostsOptions(){
    this.postsOptions = !this.postsOptions;
  }

  showCommentsOptions(){
    this.commentsOptions = !this.commentsOptions;
  }

  showUsersOptions(){
    this.usersOptions = !this.usersOptions;
  }
  selectGraph(graph: string) {

  }
}
