import { Component, OnInit } from '@angular/core';
import { UserCardManagerService } from '../../services/user-card-manager.service';
import { UserCardDetail } from '../../models/userCardDetail';
import { SelectedCardService } from '../../services/selected-card.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { UserNavbarComponent } from '../../core/components/navbar/user-navbar/user-navbar.component';
import { IMAGE_PATHS } from '../../../assets/image-paths';
import { FormsModule } from '@angular/forms';
import { UserFooterComponent } from '../../core/components/footer/user-footer/user-footer.component';

@Component({
  selector: 'app-card-type',
  standalone: true,
  imports: [CommonModule, UserNavbarComponent, FormsModule, UserFooterComponent],
  templateUrl: './card-type.component.html',
  styleUrls: ['./card-type.component.css'],
})
export class CardTypeComponent implements OnInit {
  selectedOption: string = 'landing'; // Default to landing page
  customUrl: string = '';
  vcfFileUrl: SafeUrl = '';

  // Other properties for storing card details
  displayedDetails: UserCardDetail[] = [];
  personalDetails: UserCardDetail[] = [];
  contactDetails: UserCardDetail[] = [];
  socialDetails: UserCardDetail[] = [];
  messageDetails: UserCardDetail[] = [];
  paymentDetails: UserCardDetail[] = [];

  iPhoneMock: string = IMAGE_PATHS.iPhoneMockup;
  Google: string = IMAGE_PATHS.Google;
  ContactBook: string = IMAGE_PATHS.ContactBook;
  Landing: string = IMAGE_PATHS.Landing;




  constructor(
    private userCardManager: UserCardManagerService,
    private sanitizer: DomSanitizer,
    private selectedCard: SelectedCardService
  ) {}

  ngOnInit(): void {
    this.selectedCard.getSelectedCard().subscribe(card => {
      if (card) {
        this.fetchUserCardDetails(card.id);
      }
    });
  }

  onOptionSelect(option: string): void {
    this.selectedOption = option;

    if (option === 'contact') {
      this.generateVCF();
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

  generateVCF(): void {
    let vcfContent = `BEGIN:VCARD\nVERSION:3.0\n`;
  
    this.displayedDetails.forEach(detail => {
      if (detail.fieldValue) {  // Ensure the field value is not empty
        switch (detail.name) {
          case 'First name':
            vcfContent += `FN:${detail.fieldValue}\n`;
            break;
          case 'Last name':
            vcfContent += `N:${detail.fieldValue}\n`;
            break;
          case 'Title':
            vcfContent += `TITLE:${detail.fieldValue}\n`;
            break;
          case 'Certificate':
            vcfContent += `NOTE:Certificate - ${detail.fieldValue}\n`;
            break;
          case 'Company':
            vcfContent += `ORG:${detail.fieldValue}\n`;
            break;
          case 'Email':
            vcfContent += `EMAIL:${detail.fieldValue}\n`;
            break;
          case 'Phone-Work':
            vcfContent += `TEL;WORK:${detail.fieldValue}\n`;
            break;
          case 'Phone-Mobile':
            vcfContent += `TEL;CELL:${detail.fieldValue}\n`;
            break;
          case 'Website':
            vcfContent += `URL:${detail.fieldValue}\n`;
            break;
          case 'Address':
            vcfContent += `ADR:${detail.fieldValue}\n`;
            break;
          case 'City':
            vcfContent += `ADR:;;${detail.fieldValue}\n`;
            break;
          case 'Country':
            vcfContent += `ADR:;;;;;${detail.fieldValue}\n`;
            break;
          case 'Linkedin':
            vcfContent += `X-SOCIALPROFILE;type=linkedin:${detail.fieldValue}\n`;
            break;
          case 'Instagram':
            vcfContent += `X-SOCIALPROFILE;type=instagram:${detail.fieldValue}\n`;
            break;
          case 'Facebook':
            vcfContent += `X-SOCIALPROFILE;type=facebook:${detail.fieldValue}\n`;
            break;
          case 'X':
            vcfContent += `X-SOCIALPROFILE;type=x:${detail.fieldValue}\n`;
            break;
          case 'Youtube':
            vcfContent += `X-SOCIALPROFILE;type=youtube:${detail.fieldValue}\n`;
            break;
          case 'GitHub':
            vcfContent += `X-SOCIALPROFILE;type=github:${detail.fieldValue}\n`;
            break;
          case 'TikTok':
            vcfContent += `X-SOCIALPROFILE;type=tiktok:${detail.fieldValue}\n`;
            break;
          case 'WhatsApp':
            vcfContent += `X-MESSENGER;type=whatsapp:${detail.fieldValue}\n`;
            break;
          case 'Viber':
            vcfContent += `X-MESSENGER;type=viber:${detail.fieldValue}\n`;
            break;
          case 'Messenger':
            vcfContent += `X-MESSENGER;type=messenger:${detail.fieldValue}\n`;
            break;
          case 'Skype':
            vcfContent += `X-MESSENGER;type=skype:${detail.fieldValue}\n`;
            break;
          case 'Discord':
            vcfContent += `X-MESSENGER;type=discord:${detail.fieldValue}\n`;
            break;
          case 'PayPal':
            vcfContent += `X-PAYMENT;type=paypal:${detail.fieldValue}\n`;
            break;
          case 'CashApp':
            vcfContent += `X-PAYMENT;type=cashapp:${detail.fieldValue}\n`;
            break;
          default:
            console.warn(`Unrecognized detail name: ${detail.name}`);
        }
      }
    });
  
    vcfContent += `END:VCARD`;
  
    // Create a blob of the VCF data
    const blob = new Blob([vcfContent], { type: 'text/vcard' });
  
    // Generate a safe URL for the blob
    this.vcfFileUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
  }
  
}
