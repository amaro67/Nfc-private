import { Component } from '@angular/core';
import { IMAGE_PATHS } from '../../../../../assets/image-paths';

@Component({
  selector: 'app-admin-footer',
  standalone: true,
  imports: [],
  templateUrl: './admin-footer.component.html',
  styleUrl: './admin-footer.component.css'
})
export class AdminFooterComponent {
  logoPath: string = IMAGE_PATHS.logo;


}
