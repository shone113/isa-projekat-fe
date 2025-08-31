import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  registerUser(user: User): Observable<User>{
    return new Observable<User>(); //this.http.post<User>("http://localhost:8080/api/user", user);
  }

  getImage(filename: string): Observable<Blob>{
    const url = `http://localhost:8080/images/${filename}`;
    return this.http.get(url, { responseType: 'blob' });
  }
}
