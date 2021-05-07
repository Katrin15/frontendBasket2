import { TestBed, async, inject } from '@angular/core/testing';

import { TwofactdeGuard } from './twofactde.guard';

describe('TwofactdeGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TwofactdeGuard]
    });
  });

  it('should ...', inject([TwofactdeGuard], (guard: TwofactdeGuard) => {
    expect(guard).toBeTruthy();
  }));
});
