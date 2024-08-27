// src/app/auth/register/register.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { IMAGE_PATHS } from '../../../assets/image-paths';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router'; // Import Router
import { ShowHidePasswordDirective } from '../directives/show-hide-password.directive';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    ShowHidePasswordDirective,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  logoPath: string = IMAGE_PATHS.logo;
  LoginRegister: string = IMAGE_PATHS.LoginRegister;
  registerForm: FormGroup;
  registrationError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router // Inject Router
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  
  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/user/user-dashboard']);
    }
  }
  

  onSubmit() {
    if (this.registerForm.invalid) {
      this.markAllAsTouched();
      console.log('Form is invalid');
      return;
    }

    this.authService.register(this.registerForm.value).subscribe(
      (response) => {
        console.log('Registration successful', response);
        // Handle successful registration, e.g., redirect to login, show success message, etc.
        this.redirectToLogin();
      },
      (error) => {
        console.error('Registration failed', error);
        // Handle registration error
        this.registrationError =
          'Registration failed: ' + (error.error.message || 'Unknown error');
      }
    );
  }

  private markAllAsTouched() {
    Object.values(this.registerForm.controls).forEach((control) => {
      control.markAsTouched();
    });
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }
}