import { TestBed } from '@angular/core/testing';

import { EditarutilizadoresService } from './editarutilizadores.service';

describe('EditarutilizadoresService', () => {
  let service: EditarutilizadoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditarutilizadoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
