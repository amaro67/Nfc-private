import { Component } from '@angular/core';
import { PublicNavbarComponent } from '../../navbar/public-navbar/public-navbar.component';
import { PublicFooterComponent } from '../../footer/public-footer/public-footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-public-layout',
  standalone: true,
  imports: [PublicNavbarComponent,PublicFooterComponent,RouterOutlet],
  template: `
    <app-public-navbar></app-public-navbar>
      <div class="min-vh-100">
        <router-outlet></router-outlet>
      </div>
    <app-public-footer></app-public-footer>
  `,
  styleUrl: './public-layout.component.css'
})
export class PublicLayoutComponent {

}
