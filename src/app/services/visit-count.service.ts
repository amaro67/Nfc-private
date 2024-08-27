import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class VisitCountService {
  private apiUrl = `${environment.apiBaseUrl}/VisitCount`; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  private getAuthToken(): string | null {
    return localStorage.getItem('authToken');
  }

  incrementVisitCount(userCardIdentifier: number): Observable<void> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getAuthToken()}`
    });

    return this.http.post<void>(`${this.apiUrl}/${userCardIdentifier}`, null, { headers });
  }

  getVisitCount(userCardIdentifier: number): Observable<{ visitCount: number }> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getAuthToken()}`
    });

    return this.http.get<{ visitCount: number }>(`${this.apiUrl}/${userCardIdentifier}`, { headers });
  }
}
