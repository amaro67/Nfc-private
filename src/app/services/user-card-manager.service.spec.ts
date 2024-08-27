import { TestBed } from '@angular/core/testing';

import { UserCardManagerService } from './user-card-manager.service';

describe('UserCardManagerService', () => {
  let service: UserCardManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserCardManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
