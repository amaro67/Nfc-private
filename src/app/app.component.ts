import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LandingComponent } from './public/landing/landing.component';
import { AuthService } from './services/auth.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LandingComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'nfc-platform';

  private readonly inactivityTimeout = 60 * 60 * 1000; // 1 h

  constructor(private authService: AuthService, @Inject(PLATFORM_ID) private platformId: object) {
    if (isPlatformBrowser(this.platformId)) {
      this.startInactivityCheck();
    }
  }

  @HostListener('window:mousemove')
  @HostListener('window:click')
  @HostListener('window:keypress')
  updateActivity() {
    this.authService.updateLastActivity();
  }

  startInactivityCheck() {
    setInterval(() => {
      this.authService.checkInactivity(this.inactivityTimeout);
    }, 60 * 1000); // Check every minute
  }
}
