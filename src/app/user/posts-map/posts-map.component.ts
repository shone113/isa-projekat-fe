import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { jwtDecode } from 'jwt-decode';
import { User } from '../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from '../../post/models/single-post.model';
import { Router } from '@angular/router';
import { Organization } from '../models/organization.model';

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
  organizations: Organization[] = [];

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
                    this.getOrganizations();
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

  private addMarkerWithImage(lat: number, lng: number, imgUrl: string, profileId: number, title: string): void {
    const icon = L.divIcon({
      html: `
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
          <img src="../../../assets/images/${imgUrl}" style="width: 50px; height: 50px; border-radius: 50%;"/>
          <p style="margin: 5px 0 0; font-size: 10px; font-weight: bold; text-align: center;">${title}</p>
        </div>
      `,
      className: '' // Ovo uklanja Leaflet defaultne stilove
    });
    
    
    const marker = L.marker([lat, lng], { icon }).addTo(this.map);
    if(profileId === 0)
      return;
    marker.on('click', () => {
      this.router.navigate([`profile/${profileId}`])
    });
  }

  private getPosts(){
    this.http.get<Post[]>('http://localhost:8080/api/post').subscribe({
      next: (res: Post[]) => {
        this.posts = res;
        this.posts.forEach(post => {
          if(post.creatorProfileId !== Number(this.decodedToken["profileId"])) // prikaz objava drugih korinika
            this.addMarkerWithImage(post.latitude, post.longitude, post.image, post.creatorProfileId, post.creatorName);
        });
      }
    })
  }

  private getOrganizations(){
    var token = localStorage.getItem("jwt") ? localStorage.getItem("jwt") : '';
    const headers = new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : ''
    });

    this.http.get<Organization[]>('http://localhost:8080/api/organization', {headers}).subscribe({
      next: (res: Organization[]) => {
        this.organizations = res;
        this.organizations.forEach(organization => {
          this.addMarkerWithImage(organization.latitude, organization.longitude, 'vet.jpg', 0, organization.name);
        });
      }
    })
  }
}
