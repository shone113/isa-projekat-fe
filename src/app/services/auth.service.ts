import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private roleSubject = new BehaviorSubject<string | null>(null);
  role$ = this.roleSubject.asObservable();

  constructor() {
    const role = localStorage.getItem('role');
    this.roleSubject.next(role);
  }

  login(role: string) {
    localStorage.setItem('role', role);
    this.roleSubject.next(role);
  }

  logout() {
    localStorage.removeItem('role');
    this.roleSubject.next(null);
  }

  getRole() {
    return this.roleSubject.value;
  }
}
