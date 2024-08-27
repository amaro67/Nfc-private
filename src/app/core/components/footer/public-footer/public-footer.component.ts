import { Component } from '@angular/core';
import { IMAGE_PATHS } from '../../../../../assets/image-paths';

@Component({
  selector: 'app-public-footer',
  standalone: true,
  imports: [],
  templateUrl: './public-footer.component.html',
  styleUrl: './public-footer.component.css'
})
export class PublicFooterComponent {
  logoPath: string = IMAGE_PATHS.logoWhite;

}
