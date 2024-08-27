import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from '../../environments/environments';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login and set session', () => {
    const mockResponse = { token: 'test-token', user: { id: 1, name: 'Test User' } };
    service.login({ email: 'test@test.com', password: 'password' }).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/Auth/login`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);

    expect(localStorage.getItem('authToken')).toBe('test-token');
    expect(localStorage.getItem('authUser')).toBe(JSON.stringify(mockResponse.user));
  });

  it('should get token', () => {
    localStorage.setItem('authToken', 'test-token');
    expect(service.getToken()).toBe('test-token');
  });

  it('should check if user is authenticated', () => {
    localStorage.setItem('authToken', 'test-token');
    expect(service.isAuthenticated()).toBeTrue();
  });

  it('should logout and clear session', () => {
    localStorage.setItem('authToken', 'test-token');
    localStorage.setItem('authUser', JSON.stringify({ id: 1, name: 'Test User' }));
    service.logout();
    expect(localStorage.getItem('authToken')).toBeNull();
    expect(localStorage.getItem('authUser')).toBeNull();
  });
});
