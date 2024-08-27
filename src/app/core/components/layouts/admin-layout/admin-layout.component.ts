import { Component } from '@angular/core';
import { AdminNavbarComponent } from '../../navbar/admin-navbar/admin-navbar.component';
import { AdminFooterComponent } from '../../footer/admin-footer/admin-footer.component';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [AdminNavbarComponent, AdminFooterComponent, RouterOutlet],
  template: `
  <app-admin-navbar></app-admin-navbar>
    <div class="min-vh-100 py-5">
      <router-outlet></router-outlet>
    </div>
  <app-admin-footer></app-admin-footer>
`,
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent {

}
