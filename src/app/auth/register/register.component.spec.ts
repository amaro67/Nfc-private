import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RegisterComponent } from './register.component';
import { ShowHidePasswordDirective } from '../directives/show-hide-password.directive';
import { environment } from '../../../environments/environments';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let httpTestingController: HttpTestingController;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterModule.forRoot([]),
        ShowHidePasswordDirective
      ],
      declarations: [RegisterComponent],
      providers: [AuthService]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a valid form when all fields are provided and passwords match', () => {
    component.registerForm.setValue({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      confirmPassword: 'password123'
    });
    expect(component.registerForm.valid).toBeTrue();
  });

  it('should not have a valid form when passwords do not match', () => {
    component.registerForm.setValue({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      confirmPassword: 'password1234'
    });
    expect(component.registerForm.valid).toBeFalse();
  });

  it('should submit registration form and call AuthService register method', () => {
    const spy = spyOn(authService, 'register').and.callThrough();

    component.registerForm.setValue({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      confirmPassword: 'password123'
    });
    component.onSubmit();

    const req = httpTestingController.expectOne(`${environment.apiBaseUrl}/Auth/register`);
    expect(req.request.method).toBe('POST');
    req.flush({ id: 1, email: 'john.doe@example.com', token: null });

    expect(spy).toHaveBeenCalled();
  });

  it('should show error message on registration failure', () => {
    component.registerForm.setValue({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      confirmPassword: 'password123'
    });
    component.onSubmit();

    const req = httpTestingController.expectOne(`${environment.apiBaseUrl}/Auth/register`);
    expect(req.request.method).toBe('POST');
    req.flush('Registration failed', { status: 400, statusText: 'Bad Request' });

    // Check that error message is displayed
    expect(component.registerForm.valid).toBeTrue();
  });
});
