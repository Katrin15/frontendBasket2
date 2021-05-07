import { TestBed, inject } from '@angular/core/testing';

import { ServerDataService } from './server-data.service';

describe('ServerDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServerDataService]
    });
  });

  it('should be created', inject([ServerDataService], (service: ServerDataService) => {
    expect(service).toBeTruthy();
  }));
});
