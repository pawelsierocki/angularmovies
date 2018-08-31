import { TestBed, inject } from '@angular/core/testing';

import { HashPasswordService } from './hash-password.service';

describe('HashPasswordService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HashPasswordService]
    });
  });

  it('should be created', inject([HashPasswordService], (service: HashPasswordService) => {
    expect(service).toBeTruthy();
  }));
});
