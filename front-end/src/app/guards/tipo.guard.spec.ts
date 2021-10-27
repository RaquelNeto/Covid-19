import { TestBed, async, inject } from '@angular/core/testing';

import { TipoGuard } from './tipo.guard';

describe('TipoGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TipoGuard]
    });
  });

  it('should ...', inject([TipoGuard], (guard: TipoGuard) => {
    expect(guard).toBeTruthy();
  }));
});
