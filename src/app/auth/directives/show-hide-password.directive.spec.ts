import { ShowHidePasswordDirective } from './show-hide-password.directive';
import { ElementRef, Renderer2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';

describe('ShowHidePasswordDirective', () => {
  let directive: ShowHidePasswordDirective;
  let elementRef: ElementRef;
  let renderer2: Renderer2;

  beforeEach(() => {
    // Configure the testing module
    TestBed.configureTestingModule({
      providers: [
        ShowHidePasswordDirective,
        { provide: ElementRef, useValue: new ElementRef(null) },
        Renderer2
      ]
    });

    // Inject dependencies
    directive = TestBed.inject(ShowHidePasswordDirective);
    elementRef = TestBed.inject(ElementRef);
    renderer2 = TestBed.inject(Renderer2);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});
