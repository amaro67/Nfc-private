import { Component, OnInit } from '@angular/core';
import { UserCardManagerService } from '../../services/user-card-manager.service';
import { UserCardDetail } from '../../models/userCardDetail';
import { CommonModule } from '@angular/common';
import { UserNavbarComponent } from '../../core/components/navbar/user-navbar/user-navbar.component';
import { IMAGE_PATHS } from '../../../assets/image-paths';
import { SelectedCardService } from '../../services/selected-card.service';
import { UserFooterComponent } from '../../core/components/footer/user-footer/user-footer.component';

@Component({
  selector: 'app-page-builder',
  standalone: true,
  imports: [CommonModule, UserNavbarComponent, UserFooterComponent],
  templateUrl: './page-builder.component.html',
  styleUrls: ['./page-builder.component.css'],
})
export class PageBuilderComponent implements OnInit {
  displayedDetails: UserCardDetail[] = [];
  personalDetails: UserCardDetail[] = [];
  contactDetails: UserCardDetail[] = [];
  socialDetails: UserCardDetail[] = [];
  messageDetails: UserCardDetail[] = [];
  paymentDetails: UserCardDetail[] = [];

  iPhoneMock: string = IMAGE_PATHS.iPhoneMockup;
  amar: string = IMAGE_PATHS.amar;

  constructor(
    private userCardManager: UserCardManagerService,
    private selectedCardService: SelectedCardService
  ) {}

  ngOnInit(): void {
    const selectedCard = this.selectedCardService.getSelectedCardValue(); // Get the currently selected card

    if (selectedCard) {
      this.fetchUserCardDetails(selectedCard.id); // Fetch details for the selected card
    } else {
      console.error('No card selected in the dashboard.');
    }
  }

  fetchUserCardDetails(userCardId: number): void {
    this.userCardManager.getUserCardDetails(userCardId).subscribe(details => {
      this.filterAndCategorizeDetails(details);
    });
  }

  filterAndCategorizeDetails(details: UserCardDetail[]): void {
    this.displayedDetails = details.filter(detail => detail.fieldValue !== null);
    this.categorizeDetails();
  }

  categorizeDetails(): void {
    this.resetDetails();

    this.displayedDetails.forEach(detail => {
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

  resetDetails(): void {
    this.personalDetails = [];
    this.contactDetails = [];
    this.socialDetails = [];
    this.messageDetails = [];
    this.paymentDetails = [];
  }

  toggleVisibility(detail: UserCardDetail): void {
    detail.isVisible = !detail.isVisible;
    this.userCardManager.updateUserCardDetail(detail).subscribe(() => {
      this.filterAndCategorizeDetails(this.displayedDetails);
    });
  }
}
