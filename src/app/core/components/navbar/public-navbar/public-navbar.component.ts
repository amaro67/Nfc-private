import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMAGE_PATHS } from '../../../../../assets/image-paths';
import { AuthService } from '../../../../services/auth.service';
import { User } from '../../../../models/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-public-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './public-navbar.component.html',
  styleUrls: ['./public-navbar.component.css']
})
export class PublicNavbarComponent implements OnInit {
  logoPath: string = IMAGE_PATHS.logo;
  user: User | null = null;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  
  logout(): void {
    this.authService.logout();
    this.user = null;
    this.router.navigate(['/']);
  }
}
