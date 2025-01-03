import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  token: any;
  decodedToken: any;
  loggledUserRole: string = '';

  constructor(private router: Router){}

  ngOnInit(): void {
    this.token = localStorage.getItem("jwt") ? localStorage.getItem("jwt") : '';
    if (this.token) {
      try {
        this.decodedToken = jwtDecode(this.token); // Koristite `default`
        console.log('Dekodiran token:', this.decodedToken['profileId']);

        const roles = this.decodedToken.user.roles.map((role: any) => role.name);
        if (roles.includes('ROLE_ADMIN')) {
          this.loggledUserRole = 'ROLE_ADMIN';
        } else if (roles.length > 0) {
          this.loggledUserRole = roles[0];
        } else {
          this.loggledUserRole = 'NO_ROLE';
        }

        console.log('ULOGA -> ', this.loggledUserRole);
      } catch (error) {
        console.error('Greška prilikom dekodiranja tokena:', error);
      }
    }
  }

  home(){
    this.router.navigate(["home"]);
  }
  allUsers(){
    this.router.navigate(["all-users"]);
  }
  trends(){
    this.router.navigate(["trends"]);
  }
  messages(){
    this.router.navigate(["messages"]);
  }
  profile(){
    this.router.navigate(["profile", this.decodedToken['profileId']]);
  }

  login(){
    this.router.navigate(["login"]);
  }

  getToken(): string|null{
    return localStorage.getItem("jwt")
  }

  logout(){
    localStorage.clear();
    this.router.navigate(["login"]);
  }
}
