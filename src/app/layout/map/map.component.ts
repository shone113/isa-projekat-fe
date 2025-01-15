import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  private map: any;
  private currentMarker: L.Marker | null = null;
  @Output() mapClick = new EventEmitter<{ lat: number, lng: number }>();

  ngOnInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map').setView([44.7866, 20.4489], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);


    const DefaultIcon = L.icon({
      iconUrl: 'assets/images/marker-icon.png',
      shadowUrl: 'assets/images/marker-shadow.png',
      iconSize: [25, 41], 
      iconAnchor: [12, 41], 
      popupAnchor: [1, -34], 
      shadowSize: [41, 41] 
    });
    
    L.Marker.prototype.options.icon = DefaultIcon;

    this.map.on('click', (event: L.LeafletMouseEvent) => {
      const lat = event.latlng.lat; // Latitude
      const lng = event.latlng.lng; // Longitude
  
      console.log(`Kliknuto na koordinate: Lat: ${lat}, Lng: ${lng}`);

      this.addPin(lat, lng);
    });
  }

  private addPin(lat: number, lng: number): void {
    if (this.currentMarker) {
      this.map.removeLayer(this.currentMarker);
    }
  
    this.currentMarker = L.marker([lat, lng]).addTo(this.map);
    // this.currentMarker.bindPopup(`Koordinate:<br>Lat: ${lat}<br>Lng: ${lng}`).openPopup();
    this.mapClick.emit({lat, lng});
  }

}
