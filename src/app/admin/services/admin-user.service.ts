// admin-user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../../models/user.model';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environments';


@Injectable({
  providedIn: 'root',
})
export class AdminUserService {
  private apiUrl =`${environment.apiBaseUrl}/User`;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getAuthToken()}`);
    return this.http.get<User | User[]>(this.apiUrl, { headers }).pipe(
      map((response) => {
        // Check if the response is a single user object, and wrap it in an array
        if (!Array.isArray(response)) {
          return [response]; // Wrap single user in an array
        }
        return response; // Already an array
      }),
      catchError((error) => {
        console.error('Service error:', error);
        return of([]); // Return an empty array on error
      })
    );
  }

  private getAuthToken(): string {
    return localStorage.getItem('authToken') || '';
  }
}