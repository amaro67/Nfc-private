// src/app/models/user-card.model.ts
export interface UserCard {
    id: number;        // Unique identifier for the card
    name?: string;     // Name of the card, can be nullable
    userId: number;    // ID of the user who owns the card
  }
  