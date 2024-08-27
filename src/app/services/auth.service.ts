import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { User } from '../models/user.model';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiBaseUrl}/Auth`;
  private tokenKey = 'authToken';
  private userKey = 'authUser';
  private lastActivityKey = 'lastActivity'; // New key for tracking activity

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  // Login Method
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response) => this.handleAuthSuccess(response)),
      catchError(this.handleError('login', []))
    );
  }

  // Register Method
  register(user: { firstName: string; lastName: string; email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, user).pipe(
      tap((response) => {
        this.handleAuthSuccess(response); // Store the token and user data after registration
        this.router.navigate(['/user/user-dashboard']);
      }),
      catchError(this.handleError('register', {}))
    );
  }

  // Handles successful authentication
  private handleAuthSuccess(response: any): void {
    this.setSession(response);

    const user = this.extractUserFromToken(this.decodeJwt(response.token));
    if (user) {
      const targetRoute = user.role === 'ADMIN' ? '/admin/admin-dashboard' : '/user/user-dashboard';
      this.router.navigate([targetRoute]);
    }
  }

  // Set session details in local storage
  private setSession(authResult: any): void {
    if (isPlatformBrowser(this.platformId)) {
      if (authResult.token) {
        localStorage.setItem(this.tokenKey, authResult.token);
        const decodedToken = this.decodeJwt(authResult.token);
        const user = this.extractUserFromToken(decodedToken);
        if (user) {
          localStorage.setItem(this.userKey, JSON.stringify(user));
          this.updateLastActivity(); // Set initial activity time
        }
      }
    }
  }

  // Decode JWT token
  private decodeJwt(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(atob(base64));
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  // Extract user details from decoded token
  private extractUserFromToken(decodedToken: any): User | null {
    try {
      const id = parseInt(decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'], 10);
      const nameid = decodedToken['nameid'];
      const [firstName, lastName] = nameid?.split('-') || ['', ''];
      const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

      if (id && firstName && lastName && role) {
        return { id, firstName, lastName, email: '', role, isActive: true };
      }
      return null;
    } catch (error) {
      console.error('Error extracting user from token:', error);
      return null;
    }
  }

  // Logout method to clear session
  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.tokenKey);
      localStorage.removeItem(this.userKey);
      localStorage.removeItem(this.lastActivityKey); // Remove last activity on logout
      this.router.navigate(['/login']);
    }
  }

  // Get the JWT token from local storage
  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(this.tokenKey);
    }
    return null;
  }

  // Get the user object from local storage
  getUser(): User | null {
    if (isPlatformBrowser(this.platformId)) {
      const user = localStorage.getItem(this.userKey);
      return user ? JSON.parse(user) : null;
    }
    return null;
  }

  // Check if the user is authenticated
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Update the last activity timestamp in local storage
  updateLastActivity(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.lastActivityKey, Date.now().toString());
    }
  }

  // Check for user inactivity and logout if necessary
  checkInactivity(timeout: number): void {
    if (isPlatformBrowser(this.platformId)) {
      const lastActivity = parseInt(localStorage.getItem(this.lastActivityKey) || '0', 10);
      if (Date.now() - lastActivity > timeout) {
        console.log('User has been inactive for too long, logging out...');
        this.logout();
      }
    }
  }

  // Handle errors in HTTP operations
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
