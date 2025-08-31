import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { FormControl, FormGroup, FormsModule, Validators } from "@angular/forms";
import { ReactiveFormsModule } from '@angular/forms';
import { MapComponent } from '../../layout/map/map.component';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../user/models/user.model';
import { Post } from '../models/single-post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-add-post',
  imports: [FormsModule, ReactiveFormsModule, MapComponent, CommonModule],
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.css'
})
export class AddPostComponent {
  selectedFile: File | null = null;
  addLocation: boolean = false;
  token: any;
  decodedToken: any;
  @Input() user?: User;

  addForm = new FormGroup({
    image: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    longitude: new FormControl(19.85, Validators.required),
    latitude: new FormControl(45.25, Validators.required)
  });

  constructor(private http: HttpClient, private postService: PostService) {

  }

  onAdd() {
    if (this.addForm.invalid) {
      return;
    }


    if (!this.selectedFile) {
      console.error('Molimo izaberite sliku pre slanja.');
      return;
    }

    this.postService.uploadImage(this.selectedFile).subscribe(
      {
        next: (imagePath: string) => {
          const newPost: Post = {
            id: null,
            image: imagePath,
            description: this.addForm.get('description')?.value ?? '',
            latitude: this.addForm.get('latitude')?.value ?? 0,
            longitude: this.addForm.get('longitude')?.value ?? 0,
            likesCount: 0,
            publishingDate: new Date(),
            date: new Date(),
            user: this.user,
            liked: false,
            creatorProfileId: this.user?.id ?? 0,
            creatorName: this.user?.name ?? '',
            creatorSurname: this.user?.surname ?? '',
            comments: []
          };

          console.log("New post data:", newPost);

          const token = localStorage.getItem("jwt") ? localStorage.getItem("jwt") : '';
          const headers = new HttpHeaders({
            'Authorization': token ? `Bearer ${token}` : ''
          });

          this.http.post<Post>('http://localhost:8080/api/post', newPost, { headers: headers })
            .subscribe({
              next: (response) => {
                console.log('Post je uspešno dodat:', response);
              },
              error: (error) => {
                console.error('Došlo je do greške prilikom dodavanja posta:', error);
              }
            });
        },
        error: (error) => {
          console.error('Došlo je do greške prilikom slanja slike:', error);
        }
      });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      if (this.selectedFile.type.startsWith('image/')) {
        console.log('Odabran fajl je slika:', this.selectedFile.name);
      } else {
        this.selectedFile = null;
        console.log('Odabrani fajl nije slika!');
      }
    }
  }

  closeMapModal() {
    this.addLocation = false;
  }
  
  openMapModal(event: Event){
    event.preventDefault();
    event.stopPropagation();
    this.addLocation = true;
  }
  addedLocation(event: { lat: number, lng: number }){
    this.addForm.patchValue({
      latitude: event.lat,
      longitude: event.lng
    })
  }
}
