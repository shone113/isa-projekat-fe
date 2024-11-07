import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LoginComponent,
    FormsModule,
    HttpClientModule,
  ],
  exports:[
    LoginComponent,
    HttpClientModule
  ]
})
export class UserModule { }
