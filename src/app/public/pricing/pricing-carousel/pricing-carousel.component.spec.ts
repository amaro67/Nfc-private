import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingCarouselComponent } from './pricing-carousel.component';

describe('PricingCarouselComponent', () => {
  let component: PricingCarouselComponent;
  let fixture: ComponentFixture<PricingCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PricingCarouselComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PricingCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
