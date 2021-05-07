import { TestBed, async, inject } from '@angular/core/testing';

import { SmsdeGuard } from './smsde.guard';

describe('SmsdeGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SmsdeGuard]
    });
  });

  it('should ...', inject([SmsdeGuard], (guard: SmsdeGuard) => {
    expect(guard).toBeTruthy();
  }));
});
