import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { jwtDecode } from 'jwt-decode';
import { User } from '../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from '../../post/models/single-post.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts-map',
  imports: [],
  templateUrl: './posts-map.component.html',
  styleUrl: './posts-map.component.css'
})
export class PostsMapComponent {
  private map: any;
  user: any;
  decodedToken: any
  posts: Post[] = [];
  
  constructor(private http: HttpClient, private router: Router){}

  ngOnInit(): void {
    var token = localStorage.getItem("jwt") ? localStorage.getItem("jwt") : '';
    if (token) {
      try {
        this.decodedToken = jwtDecode(token);
        const headers = new HttpHeaders({
          'Authorization': token ? `Bearer ${token}` : ''
        });
        this.http.get<User>(`http://localhost:8080/api/user/${Number(this.decodedToken['userId'])}`, {headers}).subscribe({
                  next: (res: User) => {
                    this.user = res;
                    this.initMap();
                    this.getPosts();
                  }
              });
        
      } catch{}
    }
  }

  private initMap(): void {
    this.map = L.map('map').setView([this.user.latitude, this.user.longitude], 13); 

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  }

  private addMarkerWithImage(id: number,lat: number, lng: number, imgUrl: string, profileId: number): void {
    const icon = L.divIcon({
      html: `<div style="text-align: center;">
                <img src="../../../assets/images/${imgUrl}" style="width: 50px; height: 50px; border-radius: 50%;"/>
             </div>`,
      className: ''
    });
    //  <p style="margin: 0; font-size: 12px;">${title}</p>
    const marker = L.marker([lat, lng], { icon }).addTo(this.map);
    marker.on('click', () => {
      this.router.navigate([`profile/${profileId}`])
    });
  }

  private getPosts(){
    this.http.get<Post[]>('http://localhost:8080/api/post').subscribe({
      next: (res: Post[]) => {
        this.posts = res;
        this.posts.forEach(post => {
          this.addMarkerWithImage(post.id, post.latitude, post.longitude, post.image, post.creatorProfileId);
        });
      }
    })
  }
}
