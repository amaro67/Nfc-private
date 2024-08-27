import { TestBed } from '@angular/core/testing';

import { UserCardDetailService } from './user-card-detail.service';

describe('UserCardDetailService', () => {
  let service: UserCardDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserCardDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
