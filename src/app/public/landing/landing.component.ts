import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router'; // Import Router
import { PublicNavbarComponent } from '../../core/components/navbar/public-navbar/public-navbar.component';
import { PublicFooterComponent } from '../../core/components/footer/public-footer/public-footer.component';
import { IMAGE_PATHS } from '../../../assets/image-paths';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { ProductComponent } from '../product/product.component';
import { FaqComponent } from '../faq/faq.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
  imports: [RouterOutlet, PublicNavbarComponent, PublicFooterComponent, CommonModule, ProductComponent,FaqComponent]
})
export class LandingComponent implements OnInit {
  screens: string = IMAGE_PATHS.screens;
  noApp: string = IMAGE_PATHS.noApp;
  Qr: string = IMAGE_PATHS.QR;
  NFC: string = IMAGE_PATHS.NFC;
  premium: string = IMAGE_PATHS.premium;
  cards: string = IMAGE_PATHS.cards;
  logoBg: string = IMAGE_PATHS.logoBg;
  products: Product[] = [];

  constructor(private productService: ProductService, private router: Router) {} // Inject Router

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (products) => {
        this.products = products;
      },
      (error) => {
        console.error('Error fetching products', error);
      }
    );
  }

  navigateToShop() {
    this.router.navigate(['/shop']); // Use Router to navigate
  }
}
