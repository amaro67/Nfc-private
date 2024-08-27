import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { UserCardDetail } from '../models/userCardDetail';
import { environment } from '../../environments/environments';


@Injectable({
  providedIn: 'root'
})
export class UserCardDetailService {
  private apiUrl = `${environment.apiBaseUrl}/UserCardDetail`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getUserCardDetails(userCardId: number): Observable<UserCardDetail[]> {
    const authToken = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);
    return this.http.get<UserCardDetail[]>(`${this.apiUrl}/get/${userCardId}`, { headers });
  }

  updateUserCardDetail(detail: UserCardDetail): Observable<any> {
    const authToken = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);
    return this.http.put(`${this.apiUrl}/update/${detail.id}`, detail, { headers });
  }
}
