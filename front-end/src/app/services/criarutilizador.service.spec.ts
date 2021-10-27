import { TestBed } from '@angular/core/testing';

import { CriarutilizadorService } from './criarutilizador.service';

describe('CriarutilizadorService', () => {
  let service: CriarutilizadorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CriarutilizadorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
