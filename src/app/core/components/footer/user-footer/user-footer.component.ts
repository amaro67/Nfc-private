import { Component } from '@angular/core';
import { IMAGE_PATHS } from '../../../../../assets/image-paths';

@Component({
  selector: 'app-user-footer',
  standalone: true,
  imports: [],
  templateUrl: './user-footer.component.html',
  styleUrl: './user-footer.component.css'
})
export class UserFooterComponent {
  logoPath: string = IMAGE_PATHS.logo;

}
