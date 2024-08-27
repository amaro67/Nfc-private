import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserNavbarComponent } from '../../core/components/navbar/user-navbar/user-navbar.component';
import { User } from '../../models/user.model';
import { UserCardDetailService } from '../../services/user-card-detail.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { UserCardDetail } from '../../models/userCardDetail';
import { SelectedCardService } from '../../services/selected-card.service';
import { UserCard } from '../../models/userCard.model';
import { UserFooterComponent } from '../../core/components/footer/user-footer/user-footer.component';


@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [UserNavbarComponent, CommonModule, FormsModule, UserFooterComponent],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  selectedCard: UserCard | null = null;
  user: User | null = null;
  cardName: string = ''; // Ensure cardName is always initialized as an empty string

  // Properties for categorized details
  personalDetails: UserCardDetail[] = [];
  contactDetails: UserCardDetail[] = [];
  socialDetails: UserCardDetail[] = [];
  messageDetails: UserCardDetail[] = [];
  paymentDetails: UserCardDetail[] = [];

  constructor(
    private userCardDetailService: UserCardDetailService,
    private authService: AuthService,
    private selectedCardService: SelectedCardService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUser(); // Properly initialize the 'user' property here

    if (this.user) {
      this.selectedCardService.getSelectedCard().subscribe((card) => {
        if (card) {
          this.selectedCard = card;
          this.cardName = card.name || ''; // Set card name with default value
          this.fetchUserCardDetails(card.id);
        } else {
          console.error('No card selected');
        }
      });
    } else {
      console.error('User data is null or not available');
    }
  }

  fetchUserCardDetails(userCardId: number): void {
    this.userCardDetailService.getUserCardDetails(userCardId).subscribe(
      (details) => {
        this.organizeDetails(details);
        console.log('Fetched card details:', details);
      },
      (error) => {
        console.error('Error fetching user card details:', error);
      }
    );
  }

  organizeDetails(details: UserCardDetail[]): void {
    // Clear previous details
    this.personalDetails = [];
    this.contactDetails = [];
    this.socialDetails = [];
    this.messageDetails = [];
    this.paymentDetails = [];

    details.forEach((detail) => {
      switch (detail.name) {
        case 'First name':
        case 'Last name':
        case 'Title':
        case 'Certificate':
        case 'Company':
          this.personalDetails.push(detail);
          break;
        case 'Email':
        case 'Phone-Work':
        case 'Phone-Mobile':
        case 'Website':
        case 'Address':
        case 'City':
        case 'Country':
          this.contactDetails.push(detail);
          break;
        case 'Linkedin':
        case 'Instagram':
        case 'Facebook':
        case 'X':
        case 'Youtube':
        case 'GitHub':
        case 'TikTok':
          this.socialDetails.push(detail);
          break;
        case 'WhatsApp':
        case 'Viber':
        case 'Messenger':
        case 'Skype':
        case 'Discord':
          this.messageDetails.push(detail);
          break;
        case 'PayPal':
        case 'CashApp':
          this.paymentDetails.push(detail);
          break;
        default:
          console.warn('Uncategorized detail:', detail);
      }
    });
  }

  updateCardDetails(): void {
    if (this.selectedCard) {
      const updateObservables = [
        ...this.personalDetails,
        ...this.contactDetails,
        ...this.socialDetails,
        ...this.messageDetails,
        ...this.paymentDetails
      ].map(detail => this.userCardDetailService.updateUserCardDetail(detail));

      forkJoin(updateObservables).subscribe(
        () => {
          console.log('All card details updated successfully');
          alert('All card details updated successfully');
        },
        (error) => {
          console.error('Error updating user card details:', error);
          alert('Failed to update card details');
        }
      );
    } else {
      console.error('No card selected');
      alert('Please select a card first');
    }
  }
}
