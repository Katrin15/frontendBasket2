mport { TestBed, inject } from '@angular/core/testing';

import { CheckStorageService } from './check-storage.service';

describe('CheckStorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheckStorageService]
    });
  });

  it('should be created', inject([CheckStorageService], (service: CheckStorageService) => {
    expect(service).toBeTruthy();
  }));
});
