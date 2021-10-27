import { TestBed } from '@angular/core/testing';

import { MaracacoesService } from './maracacoes.service';

describe('MaracacoesService', () => {
  let service: MaracacoesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaracacoesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
