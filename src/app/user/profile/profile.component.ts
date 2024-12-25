import { Component, OnInit } from '@angular/core';
import { Profile } from '../models/profile.model';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, ParamMap, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SinglePostComponent } from '../../post/single-post/single-post.component';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { Post } from '../../post/models/single-post.model';

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
  decodedToken: any;
  loggedUserProfile: boolean = false;
  followedByLoggedUser: boolean = false;
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router){}

  ngOnInit(): void {
    var id = this.route.snapshot.paramMap.get('id');
    const token = localStorage.getItem('jwt') || '';
    this.decodedToken = jwtDecode(token); // Koristite `default`
    console.log('Dekodiran token:', this.decodedToken['userId']);
    const headers = new HttpHeaders({
            'Authorization': token ? `Bearer ${token}` : ''
          });
    this.http.get<Profile>(`http://localhost:8080/api/profile?id=${id}`, {headers}).subscribe({
      next: (res :Profile) => {
        this.profile = res;
        console.log("Profil pri ucitavanju ", res);
        if(this.profile.user?.id == this.decodedToken['userId']){
          this.loggedUserProfile = true;
        }
        console.log("TOKEN", this.profile.user?.id);

        this.http.get<Profile[]>(`http://localhost:8080/api/profile/follower?id=${this.profile.id}`).subscribe({
          next: (res: Profile[]) => {
            //this.followers = res;
            const profiles = res;
            profiles.forEach(profile => {
              if (profile.id == this.decodedToken['profileId']) {
                this.followedByLoggedUser = true;
              }
            });

            console.log('followedByLoggedUser  *J*J*J*J*J', this.followedByLoggedUser);
          }
        })
      }
    })
  }

  followUser() {
    const token = localStorage.getItem('jwt');
    const headers = new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : ''
    });
    this.http.put<Profile[]>(`http://localhost:8080/api/profile/follow/${this.profile.id}?id=${this.decodedToken['profileId']}`, null, {headers}).subscribe({
      next: (response) =>{
        const followerIds = response.map(profile => profile.id);
        this.profile.followers = followerIds;
        if(this.profile.user){
          this.profile.user.followersCount = response.length;
          console.log("Duzinaaaa followera: ", response.length);
        }
        this.followedByLoggedUser = true;
        console.log("**************** Profile **************", response);
      }
    })
  }

  unfollowUser(){
    const token = localStorage.getItem('jwt');
    const headers = new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : ''
    });
    this.http.put<Profile[]>(`http://localhost:8080/api/profile/unfollow/${this.profile.id}?id=${this.decodedToken['profileId']}`, null, {headers}).subscribe({
      next: (response) =>{
        const followerIds = response.map(profile => profile.id);
        this.profile.followers = followerIds;
        if(this.profile.user){
          this.profile.user.followersCount = response.length;
          console.log("Duzinaaaa followera: ", response.length);
        }
        this.followedByLoggedUser = false;
        console.log("**************** Profile **************", response);
      }
    })
  }


  selectedPost: Post | null = null;
  openModal(post: any) {
    post.creatorName = this.profile.user?.name;
    post.creatorSurname = this.profile.user?.surname;
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
