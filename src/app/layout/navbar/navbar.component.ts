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
  constructor(private router: Router){}

  home(){
    this.router.navigate(["home"]);
  }

  trends(){
    this.router.navigate(["trends"]);
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
