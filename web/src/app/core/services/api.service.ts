import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

const API_URL = 'http://localhost:3000/api/v1';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {}

  private get headers() {
    return new HttpHeaders({
      Authorization: `Bearer ${this.auth.token()}`
    });
  }

  getDashboard() {
    return this.http.get(`${API_URL}/dashboard/summary`, { headers: this.headers });
  }

  getTransactions() {
    return this.http.get(`${API_URL}/transactions`, { headers: this.headers });
  }

  createTransaction(data: any) {
    return this.http.post(`${API_URL}/transactions`, data, { headers: this.headers });
  }

  getCategories() {
    return this.http.get(`${API_URL}/categories`, { headers: this.headers });
  }

  getGoals() {
    return this.http.get(`${API_URL}/goals`, { headers: this.headers });
  }

  createGoal(data: any) {
    return this.http.post(`${API_URL}/goals`, data, { headers: this.headers });
  }
}
