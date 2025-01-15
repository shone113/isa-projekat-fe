import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Post } from '../../post/models/single-post.model';
import { CommonModule } from '@angular/common';
import { SinglePostComponent } from '../../post/single-post/single-post.component';
import { User } from '../models/user.model';

@Component({
  selector: 'app-trends',
  standalone: true,
  imports: [CommonModule, SinglePostComponent],
  templateUrl: './trends.component.html',
  styleUrl: './trends.component.css'
})
export class TrendsComponent implements OnInit {
  totalPosts: number = 0;
  totalPostsLastMonth: number = 0;
  posts: Post[] = [];
  users: User[] = [];
  showPosts: boolean = true;
  activeTag: string = 'mostPopularEver';
  constructor(private http: HttpClient){}
  
  ngOnInit(): void {
    const headers = { Authorization: `Bearer ${localStorage.getItem("jwt")}` };
    this.http.get<number>("http://localhost:8080/api/post/total-number-of-posts", { headers }).subscribe({
      next: (res: number) => {
        this.totalPosts = res;
        this.animateValue(0, res, 2000, (value) => (this.totalPosts = value)); 
      }
    })

    this.http.get<number>("http://localhost:8080/api/post/total-number-of-posts-last-month", { headers }).subscribe({
      next: (res: number) => {
        this.totalPostsLastMonth = res;
        this.animateValue(0, res, 2000, (value) => (this.totalPostsLastMonth = value));
      }
    })    

    this.showMostPopularEver();
  }

  showMostPopularEver(){
    this.showPosts = true;
    const headers = { Authorization: `Bearer ${localStorage.getItem("jwt")}` };
    this.http.get<Post[]>("http://localhost:8080/api/post/most-popular-posts", { headers }).subscribe({
      next: (res: Post[]) => {
        this.posts = res;
      }
    })
  }

  showMostPopularInLastWeek(){
    this.showPosts = true;
    const headers = { Authorization: `Bearer ${localStorage.getItem("jwt")}` };
    this.http.get<Post[]>("http://localhost:8080/api/post/most-popular-posts-last-week", { headers }).subscribe({
      next: (res: Post[]) => {
        this.posts = res;
      }
    })
  }

  showUsers(){
    this.showPosts = false;
    const headers = { Authorization: `Bearer ${localStorage.getItem("jwt")}` };
    this.http.get<User[]>("http://localhost:8080/api/user/most-actived-users", { headers }).subscribe({
      next: (res: User[]) => {
        this.users = res;
      }
    })
  }

  setActiveTag(tag: string): void {
    this.activeTag = tag;
    if(tag === 'mostPopularEver')
      this.showMostPopularEver()
    else if(tag === 'mostPopularLastWeek')
      this.showMostPopularInLastWeek()
    else
      this.showUsers();
  }

  animateValue(start: number, end: number, duration: number, callback: (value: number) => void) {
    const range = end - start;
    const stepTime = Math.abs(Math.floor(duration / range));
    let current = start;
    const increment = end > start ? 1 : 0;
    const timer = setInterval(() => {
      current += increment;
      callback(current);
      if (current === end) {
        clearInterval(timer);
      }
    }, stepTime);
  }
  
}
