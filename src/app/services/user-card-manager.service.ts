// user-card-manager.service.ts
import { Injectable } from '@angular/core';
import { UserCardService } from './user-card.service';
import { UserCardDetailService } from './user-card-detail.service';
import { AuthService } from './auth.service';
import { UserCard } from '../models/userCard.model';
import { UserCardDetail } from '../models/userCardDetail';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserCardManagerService {
  constructor(
    private userCardService: UserCardService,
    private userCardDetailService: UserCardDetailService,
    private authService: AuthService
  ) {}

  getUserAndCards(): Observable<{ user: any; userCards: UserCard[] }> {
    const user = this.authService.getUser();
    if (!user) {
      console.error('User data is null or not available');
      return of({ user: null, userCards: [] });
    }

    return this.userCardService.getUserCards(user.id).pipe(
      map(userCards => ({ user, userCards })),
      catchError(error => {
        console.error('Error fetching user cards:', error);
        return of({ user, userCards: [] });
      })
    );
  }

  getUserCardDetails(userCardId: number): Observable<UserCardDetail[]> {
    return this.userCardDetailService.getUserCardDetails(userCardId).pipe(
      catchError(error => {
        console.error('Error fetching user card details:', error);
        return of([]);
      })
    );
  }

  updateUserCardDetail(detail: UserCardDetail): Observable<any> {
    return this.userCardDetailService.updateUserCardDetail(detail).pipe(
      catchError(error => {
        console.error('Error updating user card detail:', error);
        return of(null);
      })
    );
  }

  updateUserCardName(userCardId: number, newName: string): Observable<void> {
    return this.userCardService.updateUserCardName(userCardId, newName).pipe(
      catchError(error => {
        console.error('Error updating card name:', error);
        return of();
      })
    );
  }
}
