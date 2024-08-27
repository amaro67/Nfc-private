import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserCardService } from '../../services/user-card.service';
import { User } from '../../models/user.model';
import { UserCard } from '../../models/userCard.model';
import { SelectedCardService } from '../../services/selected-card.service';
import { UserNavbarComponent } from '../../core/components/navbar/user-navbar/user-navbar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserFooterComponent } from '../../core/components/footer/user-footer/user-footer.component';
import { VisitCountService } from '../../services/visit-count.service'; // Import the VisitCountService



@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
  imports: [UserNavbarComponent, CommonModule, FormsModule, UserFooterComponent]
})
export class UserDashboardComponent implements OnInit {
  user: User | null = null;
  userCards: UserCard[] = [];
  selectedCard: UserCard | null = null;
  newCardName: string = '';
  visitCount: number | null = null; // Property to store visit count


  constructor(
    private authService: AuthService,
    private userCardService: UserCardService,
    private selectedCardService: SelectedCardService,
    private visitCountService: VisitCountService // Inject VisitCountService here

  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();  // Use getUser() to get the user object
    if (this.user) {
      const userId = this.user.id;
      this.fetchUserCards(userId);
    }
  }

  fetchUserCards(userId: number): void {
    this.userCardService.getUserCards(userId).subscribe(
      (cards) => {
        this.userCards = cards;
        if (cards.length > 0) {
          // Check if there's a previously selected card in the service
          const previouslySelectedCard = this.selectedCardService.getSelectedCardValue();
          if (previouslySelectedCard && cards.some(card => card.id === previouslySelectedCard.id)) {
            this.selectCardById(previouslySelectedCard.id); // Select the previously selected card
          } else {
            this.selectCardById(cards[0].id); // Otherwise, select the first card
          }
        } else {
          console.log('User does not have any card');
        }
      },
      (error) => {
        console.error('Error fetching user cards:', error);
      }
    );
  }

  selectCardById(cardId: number): void {
    const selectedCard = this.userCards.find(card => card.id === cardId);
    if (selectedCard) {
      this.selectedCard = selectedCard;
      this.newCardName = selectedCard.name || '';
      this.selectedCardService.setSelectedCard(selectedCard); // Store the selected card
      this.fetchVisitCount(selectedCard.id); // Fetch visit count when a card is selected
    }
  }

  onSelectCard(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const cardId = +selectElement.value; // Cast the value to a number
    this.selectCardById(cardId);
  }

  renameCard(): void {
    if (this.selectedCard) {
      this.userCardService.updateUserCardName(this.selectedCard.id, this.newCardName).subscribe(
        () => {
          this.selectedCard!.name = this.newCardName;
  
          // Ensure that selectedCard is not null before calling setSelectedCard
          if (this.selectedCard) {
            this.selectedCardService.setSelectedCard(this.selectedCard); // Update the stored card name
          }
  
          alert('Card name updated successfully');
        },
        (error) => {
          console.error('Error updating card name:', error);
          alert('Failed to update card name');
        }
      );
    } else {
      console.error('No card selected');
      alert('Please select a card first');
    }
  }



  fetchVisitCount(cardId: number): void {
    this.visitCountService.getVisitCount(cardId).subscribe(
      (response) => {
        this.visitCount = response.visitCount;
      },
      (error) => {
        console.error('Error fetching visit count:', error);
      }
    );
  }
  
}
