import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgModel } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'; // Importuj ove funkcije
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClient,
    MatIconModule
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi())
  ]
})
export class AuthModule { }
