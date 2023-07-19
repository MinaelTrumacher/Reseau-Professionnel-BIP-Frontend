import { TestBed } from '@angular/core/testing';

import { ForgottenPwdService } from './forgotten-pwd.service';

describe('ForgottenPwdService', () => {
  let service: ForgottenPwdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForgottenPwdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
