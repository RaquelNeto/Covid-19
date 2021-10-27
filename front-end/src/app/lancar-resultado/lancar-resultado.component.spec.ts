import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LancarResultadoComponent } from './lancar-resultado.component';

describe('LancarResultadoComponent', () => {
  let component: LancarResultadoComponent;
  let fixture: ComponentFixture<LancarResultadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LancarResultadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LancarResultadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
