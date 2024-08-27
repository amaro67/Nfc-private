import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../services/auth.service';
import { of, throwError } from 'rxjs';
import { LoginComponent } from './login.component';

class MockAuthService {
  login(credentials: { email: string; password: string }) {
    if (credentials.email === 'test@test.com' && credentials.password === 'password') {
      return of({ token: 'test-token', user: { id: 1, name: 'Test User' } });
    } else {
      return throwError('Invalid email or password');
    }
  }
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule],
      declarations: [LoginComponent],
      providers: [{ provide: AuthService, useClass: MockAuthService }]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display login error on invalid credentials', () => {
    component.loginForm.setValue({ email: 'wrong@test.com', password: 'wrongpassword' });
    component.onSubmit();
    expect(component.loginError).toBe('Invalid email or password');
  });

  it('should redirect to dashboard on successful login', () => {
    const navigateSpy = spyOn(component['router'], 'navigate');
    component.loginForm.setValue({ email: 'test@test.com', password: 'password' });
    component.onSubmit();
    expect(navigateSpy).toHaveBeenCalledWith(['/user/user-dashboard']);
  });
});
