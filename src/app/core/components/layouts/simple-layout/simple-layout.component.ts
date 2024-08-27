import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-simple-layout',
  standalone: true,
  template: `
  <div class="min-vh-100">
    <router-outlet></router-outlet>
  </div>  `,
  imports: [RouterOutlet],
  styleUrl: './simple-layout.component.css'
})
export class SimpleLayoutComponent {

}
