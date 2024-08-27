import { Directive, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[appShowHidePassword]',
  standalone: true
})
export class ShowHidePasswordDirective implements OnInit {
  private isVisible = false;
  private input!: HTMLInputElement;
  private icon!: HTMLElement;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.input = this.el.nativeElement.querySelector('input');
    this.icon = this.el.nativeElement.querySelector('.password-toggle-icon');

    if (!this.input || !this.icon) {
      throw new Error('Input or icon element not found');
    }

    this.renderer.listen(this.icon, 'click', (event: Event) => {
      event.preventDefault();
      this.togglePassword();
    });
  }

  togglePassword() {
    this.isVisible = !this.isVisible;

    if (this.isVisible) {
      this.renderer.setAttribute(this.input, 'type', 'text');
      this.renderer.removeClass(this.icon, 'bi-eye');
      this.renderer.addClass(this.icon, 'bi-eye-slash');
    } else {
      this.renderer.setAttribute(this.input, 'type', 'password');
      this.renderer.removeClass(this.icon, 'bi-eye-slash');
      this.renderer.addClass(this.icon, 'bi-eye');
    }
  }
}
