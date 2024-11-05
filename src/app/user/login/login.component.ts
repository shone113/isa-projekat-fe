import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { UserService } from '../user.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isSignDivVisiable: boolean  = true;

  user: User = {
    id: 0, 
    name: '',
    surname: '',
    email: '',
    password: '',
    //address: ''
    role : 0
  };
  checkPassword: string = "";
  loginObj: LoginModel  = new LoginModel();

  constructor(private router: Router, private service: UserService, private http: HttpClient){}


  onRegister() {
    if(this.user.password !== this.checkPassword)
      alert("You must enter the correct password twice.")
    // if(this.user.name === '' || this.user.surname === '' || this.user.email || this.user.address === '' || this.user.password === '')
    //   return;

    this.http.post<User>("http://localhost:8080/api/user", this.user).subscribe({
      next: () =>{
        alert("Successfully register.")
      }
    
  })
    // this.service.registerUser(this.user).subscribe({
    //   next: () =>{
    //     alert("Successfully register.")
    //   }
    // })
    
  }

  onLogin() {
    alert("Login");
  }

}


export class LoginModel  { 
  email: string;
  password: string;

  constructor() {
    this.email = ""; 
    this.password= ""
  }
}
