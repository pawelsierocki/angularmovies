import { TestBed, inject } from '@angular/core/testing';

import { LoaderSService } from './loader-s.service';

describe('LoaderSService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoaderSService]
    });
  });

  it('should be created', inject([LoaderSService], (service: LoaderSService) => {
    expect(service).toBeTruthy();
  }));
});
