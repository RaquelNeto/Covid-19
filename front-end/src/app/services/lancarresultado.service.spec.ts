import { TestBed } from '@angular/core/testing';

import { LancarresultadoService } from './lancarresultado.service';

describe('LancarresultadoService', () => {
  let service: LancarresultadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LancarresultadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
