import { TestBed, async, inject } from '@angular/core/testing';

import { MoviesDetailsGuard } from './movies-details.guard';

describe('MoviesDetailsGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MoviesDetailsGuard]
    });
  });

  it('should ...', inject([MoviesDetailsGuard], (guard: MoviesDetailsGuard) => {
    expect(guard).toBeTruthy();
  }));
});
