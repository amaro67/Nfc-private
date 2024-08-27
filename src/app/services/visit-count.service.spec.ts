import { TestBed } from '@angular/core/testing';

import { VisitCountService } from './visit-count.service';

describe('VisitCountService', () => {
  let service: VisitCountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisitCountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
