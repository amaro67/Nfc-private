import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { IMAGE_PATHS } from '../../../../../assets/image-paths';

@Component({
  selector: 'app-admin-navbar',
  standalone: true,
  imports: [],
  templateUrl: './admin-navbar.component.html',
  styleUrl: './admin-navbar.component.css'
})
export class AdminNavbarComponent {
  logoPath: string = IMAGE_PATHS.logo;
  userName: string = 'Guest';
  firstname: string = '';


  constructor(private router: Router, private authService: AuthService) {}

  
  ngOnInit(): void {
    const user = this.authService.getUser();
    this.userName = user ? `${user.firstName} ${user.lastName}` : 'Guest';
    this.firstname = user ? `${user.firstName}` : 'User';
  }
  logout(): void {
    this.authService.logout();
  }


  navigateToUserList() {
    this.router.navigate(['/admin/users']);
  }

  navigateToOrderList() {
    this.router.navigate(['/admin/orders']);
  }
}
