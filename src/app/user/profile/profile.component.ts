import { Component, OnInit } from '@angular/core';
import { Profile } from '../models/profile.model';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, ParamMap, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SinglePostComponent } from '../../post/single-post/single-post.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, SinglePostComponent, MatIconModule, RouterModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  profile: Profile = {
    id: 0,
    user: undefined,
    posts: []
  };
  followers: Profile[] = [];
  showFollowers: boolean = false;
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router){}

  ngOnInit(): void {
    var id = this.route.snapshot.paramMap.get('id');
    this.http.get<Profile>(`http://localhost:8080/api/profile?id=${id}`).subscribe({
      next: (res :Profile) => {
        this.profile = res;
      }
    })
  }
  selectedPost: any = null;

  openModal(post: any) {
    this.selectedPost = post;
  }

  closeModal() {
    this.selectedPost = null;
    this.showFollowers = false;
  }
  openFollowerModal(type: number) {
    var path = ""
    if(type === 1)
      path = "follower"
    else
      path = "following"

    this.http.get<Profile[]>(`http://localhost:8080/api/profile/${path}?id=${this.profile.id}`).subscribe({
      next: (res: Profile[]) => {
        this.followers = res;
      }
    })

    this.showFollowers = true;
  }

  navigateToProfile(profileId: number){
    this.router.navigate(['../', profileId], { relativeTo: this.route });
    this.http.get<Profile>(`http://localhost:8080/api/profile?id=${profileId}`).subscribe({
      next: (res :Profile) => {
        this.profile = res;
        this.showFollowers = false;
      }
    })
  }

}
