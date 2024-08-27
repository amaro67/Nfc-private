import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { ProductComponent } from '../product/product.component';
import { PricingCarouselComponent } from './pricing-carousel/pricing-carousel.component';
import { IMAGE_PATHS } from '../../../assets/image-paths';
import { FaqComponent } from '../faq/faq.component';
@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule, PricingCarouselComponent, ProductComponent, FaqComponent],
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})
export class PricingComponent implements OnInit {
  logoBg: string = IMAGE_PATHS.logoBg;
  products: Product[] = [];

  constructor(private productService: ProductService) {}

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
}
