import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserNavbarComponent } from '../../navbar/user-navbar/user-navbar.component';
import { UserFooterComponent } from '../../footer/user-footer/user-footer.component';

@Component({
  selector: 'app-user-layout',
  standalone: true,
  imports: [RouterOutlet,UserNavbarComponent,UserFooterComponent],
  template: `
  <app-user-navbar></app-user-navbar>
    <div class="min-vh-100 py-5">
      <router-outlet></router-outlet>
    </div>
  <app-user-footer></app-user-footer>
`,
  styleUrl: './user-layout.component.css'
})
export class UserLayoutComponent {

}
