import { TestBed, inject } from '@angular/core/testing';

import { CanActivateLinkService } from './can-activate-link.service';

describe('CanActivateLinkService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanActivateLinkService]
    });
  });

  it('should be created', inject([CanActivateLinkService], (service: CanActivateLinkService) => {
    expect(service).toBeTruthy();
  }));
});
