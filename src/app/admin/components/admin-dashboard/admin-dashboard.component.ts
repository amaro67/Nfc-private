// admin-dashboard.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminNavbarComponent } from '../../../core/components/navbar/admin-navbar/admin-navbar.component';
import { AdminFooterComponent } from '../../../core/components/footer/admin-footer/admin-footer.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [AdminNavbarComponent,AdminFooterComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  constructor(private router: Router) {}

  navigateToUserList() {
    this.router.navigate(['/admin/users']);
  }

  navigateToOrderList() {
    this.router.navigate(['/admin/orders']);
  }
}
