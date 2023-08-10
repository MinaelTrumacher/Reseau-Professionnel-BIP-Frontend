import { TestBed } from '@angular/core/testing';

import { UnauthGuardGuard } from './unauth-guard.guard';

describe('UnauthGuardGuard', () => {
  let guard: UnauthGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UnauthGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
