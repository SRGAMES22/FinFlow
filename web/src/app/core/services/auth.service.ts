import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:3000/api/v1';

export interface User {
  id: number;
  name: string;
  email: string;
  subscription_type: 'free' | 'mercenary';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser = signal<User | null>(null);
  token = signal<string | null>(localStorage.getItem('finflow-token'));

  constructor(private http: HttpClient) {
    if (this.token()) {
      this.me().subscribe({
        next: (res) => this.currentUser.set(res.user),
        error: () => this.logout()
      });
    }
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${API_URL}/auth/login`, { email, password }).pipe(
      tap((res: any) => {
        localStorage.setItem('finflow-token', res.token);
        this.token.set(res.token);
        this.currentUser.set(res.user);
      })
    );
  }

  register(name: string, email: string, password: string): Observable<any> {
    return this.http.post(`${API_URL}/auth/register`, { name, email, password }).pipe(
      tap((res: any) => {
        localStorage.setItem('finflow-token', res.token);
        this.token.set(res.token);
        this.currentUser.set(res.user);
      })
    );
  }

  me(): Observable<any> {
    return this.http.get(`${API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${this.token()}` }
    });
  }

  logout() {
    localStorage.removeItem('finflow-token');
    this.token.set(null);
    this.currentUser.set(null);
  }

  isLoggedIn(): boolean {
    return !!this.token();
  }
}
