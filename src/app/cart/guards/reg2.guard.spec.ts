import { TestBed, async, inject } from '@angular/core/testing';

import { Reg2Guard } from './reg2.guard';

describe('Reg2Guard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Reg2Guard]
    });
  });

  it('should ...', inject([Reg2Guard], (guard: Reg2Guard) => {
    expect(guard).toBeTruthy();
  }));
});
