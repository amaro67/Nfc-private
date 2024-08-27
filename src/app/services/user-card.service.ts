// user-card.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserCard } from '../models/userCard.model';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class UserCardService {
  private apiUrl = `${environment.apiBaseUrl}/UserCard`;

  constructor(private http: HttpClient) {}

  getUserCards(userId: number): Observable<UserCard[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getAuthToken()}`);
    return this.http.get<UserCard[]>(`${this.apiUrl}/get/${userId}`, { headers });
  }

  updateUserCardName(userCardId: number, newName: string): Observable<void> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getAuthToken()}`);
    const body = { name: newName };
    return this.http.put<void>(`${this.apiUrl}/${userCardId}`, body, { headers });
  }

  private getAuthToken(): string {
    return localStorage.getItem('authToken') || '';
  }
}
