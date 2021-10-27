import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestaoutilizadoresComponent } from './gestaoutilizadores.component';

describe('GestaoutilizadoresComponent', () => {
  let component: GestaoutilizadoresComponent;
  let fixture: ComponentFixture<GestaoutilizadoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestaoutilizadoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestaoutilizadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
