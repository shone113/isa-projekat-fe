import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  private map: any;

  posts = [
    {
      lat: 44.7866,
      lng: 20.4489,
      imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_vO_Sf0jCvAeLnhrTrKxnGuBYj3eOansjdw&s',
      title: 'Objava 1'
    },
    {
      lat: 44.8176,
      lng: 20.4569,
      imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_vO_Sf0jCvAeLnhrTrKxnGuBYj3eOansjdw&s',
      title: 'Objava 2'
    },
    {
      lat: 44.8006,
      lng: 20.4609,
      imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_vO_Sf0jCvAeLnhrTrKxnGuBYj3eOansjdw&s',
      title: 'Objava 3'
    }
  ];
  
  ngOnInit(): void {
    this.initMap();
    this.addMarkerWithImage(44.7866, 20.4489, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_vO_Sf0jCvAeLnhrTrKxnGuBYj3eOansjdw&s', 'Dusan');
    this.addMarkerWithImage(44.8176, 20.4569, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_vO_Sf0jCvAeLnhrTrKxnGuBYj3eOansjdw&s', 'Kecman');  
  
    // this.posts.forEach(post => {
    //   this.addMarkerWithImage(post.lat, post.lng, post.imgUrl, post.title);
    // });
  }

  private initMap(): void {
    this.map = L.map('map').setView([44.7866, 20.4489], 13); // Lokacija (Beograd) i početni zoom

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  }

  private addMarkerWithImage(lat: number, lng: number, imgUrl: string, title: string): void {
    const icon = L.divIcon({
      html: `<div style="text-align: center;">
                <img src="${imgUrl}" style="width: 50px; height: 50px; border-radius: 50%;"/>
                <p style="margin: 0; font-size: 12px;">${title}</p>
             </div>`,
      className: ''
    });

    L.marker([lat, lng], { icon }).addTo(this.map);
  }
}
