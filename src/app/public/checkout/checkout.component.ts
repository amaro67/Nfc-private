// checkout.component.ts
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Product } from '../../models/product.model'; // Import Product interface

@Component({
  selector: 'app-checkout',
  standalone: true,
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartItems: Product[] = [];  // Explicitly declare cartItems as an array of Product
  isLoggedIn = false;

  constructor(private cartService: CartService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe(items => this.cartItems = items);
    this.isLoggedIn = this.authService.isAuthenticated();
  }

  onSubmitOrder() {
    if (!this.isLoggedIn) {
      this.router.navigate(['/register']);
    } else {
      console.log('Order submitted', this.cartItems);
    }
  }
}
