import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserCard } from '../models/userCard.model';

@Injectable({
  providedIn: 'root'
})
export class SelectedCardService {
  private selectedCardSubject = new BehaviorSubject<UserCard | null>(this.getCardFromLocalStorage());

  setSelectedCard(card: UserCard): void {
    this.selectedCardSubject.next(card);
    localStorage.setItem('selectedCard', JSON.stringify(card)); // Store the selected card in local storage
  }

  getSelectedCard(): Observable<UserCard | null> {
    return this.selectedCardSubject.asObservable();
  }

  getSelectedCardValue(): UserCard | null {
    return this.selectedCardSubject.value;
  }

  private getCardFromLocalStorage(): UserCard | null {
    const storedCard = localStorage.getItem('selectedCard');
    return storedCard ? JSON.parse(storedCard) : null;
  }
}
