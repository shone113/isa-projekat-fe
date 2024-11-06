import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { UserService } from '../user.service';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { __values } from 'tslib';
import { LoginDetails } from '../models/login-details.model';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  isSignDivVisiable: boolean  = true;
  isRegister: boolean = false;
  loading: boolean = false;
  code: string = "";
  loginErrorMessage: string = "";

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    checkPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
  });
  

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
  loginDetails: LoginDetails = {
      email: '',
      password: ''
    }
  sendCodeAgain: boolean = false; 

  constructor(private router: Router, private service: UserService, private http: HttpClient){}

  ngOnInit(): void {
    
  }

  passwordMatchValidator():  boolean{
    const password = this.registerForm.get('password');
    const checkPassword = this.registerForm.get('checkPassword');
    
    if (password && checkPassword && password.value !== checkPassword.value) {
      return true;  
    }
    return false;  
  }

  onRegister() {
    if(!this.registerForm.valid || this.passwordMatchValidator())
      return;
     
    const user: User = {
      id: 0,
      name: this.registerForm.value.name!,
      surname: this.registerForm.value.surname!,
      email: this.registerForm.value.email!,
      password: this.registerForm.value.password!,
      role: 0, 
    };

    this.loading = true;
    this.http.post<User>("http://localhost:8080/api/user", user).subscribe({
      next: (res) =>{
        this.loading = false
        this.isRegister = true;
        this.user = res;
      }
  })
    // this.service.registerUser(this.user).subscribe({
    //   next: () =>{
    //     alert("Successfully register.")
    //   }
    // })
    
  }

  onLogin() {
    
    this.http.post<User>(`http://localhost:8080/api/user/login`, this.loginDetails).subscribe({
      next: () =>{
        this.isSignDivVisiable = false;
        this.loginErrorMessage = '';
        this.loginDetails.email = '';
        this.loginDetails.password = '';
        alert("Successfully signed in!");
      },
      error: (err: HttpErrorResponse) =>{
        if(err.status == 404)
          this.loginErrorMessage = "Account with this email doesnt exist.";
        if(err.status == 400)
          this.loginErrorMessage = "The password is not correct.";
         if(err.status == 422 ){
          this.loginErrorMessage = "You are not acitvate account.";
          this.sendCodeAgain = true;
         }
      }
    })
  }
  
  onActivate(){
    if(this.user.email === '')
      this.user.email = this.loginDetails.email;
    this.http.get<User>(`http://localhost:8080/api/user/activate/${this.user.email}/${this.code}`).subscribe({
      next: () =>{
        this.isSignDivVisiable = false;
      }
    })
  }

  sendCode() {
    this.loading = true;
    console.log(this.loginDetails.email)
    this.http.get<string>(`http://localhost:8080/api/user/code/${this.loginDetails.email}`).subscribe({
      next: () =>{
        this.isRegister = true;
        this.isSignDivVisiable = true;
        this.loading = false;
        this.sendCodeAgain = false;
        this.loginErrorMessage = '';
      }
    })
  }

}

