import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { IMAGE_PATHS } from '../../../assets/image-paths';
import { ShowHidePasswordDirective } from '../directives/show-hide-password.directive';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    ShowHidePasswordDirective
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  logoPath: string = IMAGE_PATHS.logo;
  LoginRegister: string = IMAGE_PATHS.LoginRegister;
  loginForm: FormGroup;
  loginError: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      const user = this.authService.getUser();
      if (user && user.role === 'ADMIN') {
        this.router.navigate(['/admin/admin-dashboard']);
      } else {
        this.router.navigate(['/user/user-dashboard']);
      }
    }
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.markAllAsTouched();
      return;
    }

    this.loginError = null; // Reset the error message

    this.authService.login(this.loginForm.value).subscribe(
      response => {
        console.log('Login successful', response);
        const user = this.authService.getUser();
        if (user && user.role === 'ADMIN') {
          this.router.navigate(['/admin/admin-dashboard']);
        } else {
          this.router.navigate(['/user/user-dashboard']);
        }
      },
      error => {
        console.error('Login failed', error);
        this.loginError = 'Invalid email or password. Please try again.';
      }
    );
  }

  private markAllAsTouched() {
    Object.values(this.loginForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  redirectToRegister() {
    this.router.navigate(['/register']);
  }
}
