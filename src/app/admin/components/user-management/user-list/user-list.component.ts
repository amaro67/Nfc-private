// user-list.component.ts
import { Component, OnInit } from '@angular/core';
import { AdminUserService } from '../../../services/admin-user.service';
import { User } from '../../../../models/user.model';
import { CommonModule } from '@angular/common';
import { AdminNavbarComponent } from '../../../../core/components/navbar/admin-navbar/admin-navbar.component';
import { AdminFooterComponent } from '../../../../core/components/footer/admin-footer/admin-footer.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  standalone: true,
  imports: [CommonModule, AdminNavbarComponent,AdminFooterComponent]
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(private adminUserService: AdminUserService) {}

  ngOnInit(): void {
    this.adminUserService.getUsers().subscribe(
      (users: User[]) => {
        console.log('Fetched users:', users);
        this.users = users;
        this.loading = false;
        console.log(users.length);
      },
      (error) => {
        console.error('Error fetching users', error);
        this.error = 'Failed to load user data';
        this.loading = false;
      }
    );
  }
}
