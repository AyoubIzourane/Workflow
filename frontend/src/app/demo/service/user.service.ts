import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/User';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  BASE_URL: string = 'http://localhost:3000';
  tokenKey: string = 'token'; // Key for storing token in local storage

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(`${this.BASE_URL}/users`);
  }

  getUser(id: number): Observable<User>{
    return this.http.get<User>(`${this.BASE_URL}/users/${id}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.BASE_URL}/users`, user);
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.patch<User>(`${this.BASE_URL}/users/${id}`, user);
  }

  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(`${this.BASE_URL}/users/${id}`);
  }

  login(user: User): Observable<any> {
    return this.http.post<any>(`${this.BASE_URL}/auth/login`, user).pipe(
      tap(response => {
        if (response && response.token) {
          localStorage.setItem(this.tokenKey, response.token); // Store token in local storage
        }
      })
    );
  }
  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.BASE_URL}/auth/forgot-password`, { email });
  }
  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.BASE_URL}/auth/reset-password`, { token, newPassword });
  }

  getCurrentUser(): Observable<User> {
    const token = localStorage.getItem(this.tokenKey); // Retrieve token from local storage
    if (token) {
      // If token exists, include it in the request headers
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });
      return this.http.get<User>(`${this.BASE_URL}/auth/current-user`, { headers });
    } else {
      // If token doesn't exist, return an empty observable or handle it based on your application logic
      return new Observable<User>();
    }
  }
}
