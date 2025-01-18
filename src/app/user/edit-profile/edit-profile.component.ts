import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MapComponent } from '../../layout/map/map.component';
import { jwtDecode } from 'jwt-decode';
import { User } from '../models/user.model';

@Component({
  selector: 'app-edit-profile',
  imports: [CommonModule, FormsModule, HttpClientModule, ReactiveFormsModule, MapComponent],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent implements OnChanges{
  addLocation: boolean = false;
  decodedToken: any;
  token: any;
  @Input() user?: User;
  @Output() editedUser = new EventEmitter<User>();
  editForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    longitude: new FormControl(0.0, [Validators.required]),
    latitude: new FormControl(0.0, [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    checkPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor(private http: HttpClient){}
  
  ngOnChanges(changes: SimpleChanges): void {
    this.editForm.patchValue({
      name: this.user!.name,
      surname: this.user!.surname,
      latitude: this.user!.latitude,
      longitude: this.user!.longitude,
      password: this.user!.password,
      checkPassword: this.user!.password
    })
  }

  passwordMatchValidator(): boolean {
    const password = this.editForm.get('password')?.value;
    const checkPassword = this.editForm.get('checkPassword')?.value;
    return password !== checkPassword;
  }
  

  onEdit(){
    if(this.editForm.invalid)
      return;

    var editUser = {
      id: this.user!.id,
      name: this.editForm.value.name,
      surname: this.editForm.value.surname,
      email: this.user!.email,
      longitude: this.editForm.value.longitude,
      latitude: this.editForm.value.latitude,
      password: this.editForm.value.password,
      // role: this.user!.role,
      followers: this.user!.followers,
      followersCount: this.user!.followersCount,
      followingCount: this.user!.followingCount
    }

    this.token = localStorage.getItem("jwt") ? localStorage.getItem("jwt") : '';
    const headers = new HttpHeaders({
      'Authorization': this.token ? `Bearer ${this.token}` : ''
    });
    this.http.put<User>(`http://localhost:8080/api/user/${this.user!.id}`, editUser, {headers}).subscribe({
      next: (res: User) => {
        this.editedUser.emit(res);
      }
    })
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
    this.editForm.patchValue({
      latitude: event.lat,
      longitude: event.lng
    })
  }
    
}
