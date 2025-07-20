import { CommonModule } from '@angular/common';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnChanges{

  token: any;
  decodedToken: any;
  loggledUserRole: string = '';
  role: string = '';

  constructor(private router: Router, private authService: AuthService){}

  ngOnInit(): void {
    this.authService.role$.subscribe((role) => {
      this.role = role!;
    });
    this.token = localStorage.getItem("jwt") ? localStorage.getItem("jwt") : '';
    if (this.token) {
      try {
        this.decodedToken = jwtDecode(this.token); // Koristite `default`
        this.role = this.decodedToken['role'];
        console.log('Dekodiran token:', this.decodedToken['profileId']);

        const roles = this.decodedToken.user.roles.map((role: any) => role.name);
        if (roles.includes('ROLE_ADMIN')) {
          this.loggledUserRole = 'ROLE_ADMIN';
        } else if (roles.length > 0) {
          this.loggledUserRole = roles[0];
        } else {
          this.loggledUserRole = 'NO_ROLE';
        }
        this.home()
        console.log('ULOGA -> ', this.loggledUserRole);
      } catch (error) {
        console.error('Greška prilikom dekodiranja tokena:', error);
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.token = localStorage.getItem("jwt") ? localStorage.getItem("jwt") : '';
    if (this.token) {
      try {
        this.decodedToken = jwtDecode(this.token); // Koristite `default`
        this.role = this.decodedToken['role'];
        console.log('Dekodiran token:', this.decodedToken['profileId']);

        const roles = this.decodedToken.user.roles.map((role: any) => role.name);
        if (roles.includes('ROLE_ADMIN')) {
          this.loggledUserRole = 'ROLE_ADMIN';
        } else if (roles.length > 0) {
          this.loggledUserRole = roles[0];
        } else {
          this.loggledUserRole = 'NO_ROLE';
        }
        this.home()
        console.log('ULOGA -> ', this.loggledUserRole);
      } catch (error) {
        console.error('Greška prilikom dekodiranja tokena:', error);
      }
    }
  }

  home(){
    if(this.role == 'ROLE_ADMIN'){
      console.log("OVO JE ZA ADMINA");
      this.router.navigate(["admin-homepage"]);
    }else{
      this.router.navigate(["home"]);
    }
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
    this.token = localStorage.getItem("jwt") ? localStorage.getItem("jwt") : '';
    if (this.token) {
      try {
        this.decodedToken = jwtDecode(this.token);
      } catch (error) {
      }
    }
    this.router.navigate(["profile", Number(this.decodedToken['profileId'])]);
  }

  login(){
    this.router.navigate(["login"]);
  }
   map(){
    this.router.navigate(["map"]);
   }

  getToken(): string|null{
    return localStorage.getItem("jwt")
  }

  logout(){
    localStorage.removeItem("jwt");
    localStorage.clear();
    this.router.navigate(["login"]);
    this.authService.logout();
  }
}
