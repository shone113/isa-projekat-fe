import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoginDetails } from '../models/login-details.model';
// import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit{
  b: LoginDetails[] = [];
  loginDetails: LoginDetails = {
    email: '',
    password: ''
  }
  ngOnInit(): void {
    let a;
    for(a=0; a<3; a++){
      this.b.push(this.loginDetails)
    }
    
  }


}
