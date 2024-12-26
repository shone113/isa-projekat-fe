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
import {jwtDecode} from 'jwt-decode';


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
    role : 0,
    followingCount: 0,
    followers: 0
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
      followingCount: 0,
      followers: 0
    };
    this.loginErrorMessage = '';
    this.loginDetails.email = '';
    this.loginDetails.password = '';
    this.loading = true;
    this.http.post<User>("http://localhost:8080/auth/signup", user).subscribe({
      next: (res) =>{
        this.loading = false
        this.isRegister = true;
        this.isSignDivVisiable = false;
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

    this.http.post<any>(`http://localhost:8080/auth/login`, this.loginDetails).subscribe({
      next: (res) =>{
        this.loginErrorMessage = '';
        this.loginDetails.email = '';
        this.loginDetails.password = '';
        // console.log(res);
        localStorage.setItem("jwt", res.accessToken);

        const token = res.accessToken;
        const decodedToken = jwtDecode(token);
        console.log("OVAJ SE LOGUJEEEEEE");
        console.log(decodedToken);
        const userRole = (decodedToken as any).role;
        console.log('User role:', userRole);
        if(userRole == 'ROLE_ADMIN'){
          this.router.navigate(["admin-homepage"])
        }else{
          this.router.navigate(["home"])
        }
      },
      error: (err: HttpErrorResponse) =>{
        if(err.status == 404)
          this.loginErrorMessage = "Account with this email doesnt exist.";
        if(err.status == 401)
          this.loginErrorMessage = "The password is not correct.";
         if(err.status == 406 ){
          this.loginErrorMessage = "You are not acitvate account.";
          this.sendCodeAgain = true;
         }
         localStorage.clear();
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

}

