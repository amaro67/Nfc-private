import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserCardDetailService } from '../../services/user-card-detail.service';
import { UserCardDetail } from '../../models/userCardDetail';
import { SelectedCardService } from '../../services/selected-card.service';
import { UserCard } from '../../models/userCard.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-landing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-landing.component.html',
  styleUrl: './user-landing.component.css'
})
export class UserLandingPageComponent implements OnInit {
  userCardDetails: UserCardDetail[] = [];
  selectedCard: UserCard | null = null;
  userId!: number;

  constructor(
    private userCardDetailService: UserCardDetailService,
    private selectedCardService: SelectedCardService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = +params['id']; // Get userId from route parameters
      this.selectedCard = this.selectedCardService.getSelectedCardValue(); // Get the selected card
      if (this.selectedCard) {
        this.fetchUserCardDetails(this.selectedCard.id);
      }
    });
  }

  fetchUserCardDetails(userCardId: number): void {
    this.userCardDetailService.getUserCardDetails(userCardId).subscribe(
      details => {
        this.userCardDetails = details;
      },
      error => {
        console.error('Error fetching user card details:', error);
      }
    );
  }
}
