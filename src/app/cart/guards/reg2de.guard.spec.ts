import { TestBed, async, inject } from '@angular/core/testing';

import { Reg2deGuard } from './reg2de.guard';

describe('Reg2deGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Reg2deGuard]
    });
  });

  it('should ...', inject([Reg2deGuard], (guard: Reg2deGuard) => {
    expect(guard).toBeTruthy();
  }));
});
