import { TestBed, inject } from '@angular/core/testing';

import { ChoosePageService } from './choose-page.service';

describe('ChoosePageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChoosePageService]
    });
  });

  it('should be created', inject([ChoosePageService], (service: ChoosePageService) => {
    expect(service).toBeTruthy();
  }));
});
