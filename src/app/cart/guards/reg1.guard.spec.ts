import { TestBed, async, inject } from '@angular/core/testing';

import { Reg1Guard } from './reg1.guard';

describe('Reg1Guard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Reg1Guard]
    });
  });

  it('should ...', inject([Reg1Guard], (guard: Reg1Guard) => {
    expect(guard).toBeTruthy();
  }));
});
