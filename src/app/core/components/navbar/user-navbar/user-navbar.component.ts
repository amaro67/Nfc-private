// user-navbar.component.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { IMAGE_PATHS } from '../../../../../assets/image-paths';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-navbar',
  standalone: true,
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.css'],
  imports: [RouterModule]
})
export class UserNavbarComponent implements OnInit {
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
}

