import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarutilizadorComponent } from './criarutilizador.component';

describe('CriarutilizadorComponent', () => {
  let component: CriarutilizadorComponent;
  let fixture: ComponentFixture<CriarutilizadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriarutilizadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarutilizadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
