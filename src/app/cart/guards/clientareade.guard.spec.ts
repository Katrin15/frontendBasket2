import { TestBed, async, inject } from '@angular/core/testing';

import { ClientareadeGuard } from './clientareade.guard';

describe('ClientareadeGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClientareadeGuard]
    });
  });

  it('should ...', inject([ClientareadeGuard], (guard: ClientareadeGuard) => {
    expect(guard).toBeTruthy();
  }));
});
