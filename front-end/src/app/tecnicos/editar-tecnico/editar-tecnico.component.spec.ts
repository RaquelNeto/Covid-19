import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarTecnicoComponent } from './editar-tecnico.component';

describe('EditarTecnicoComponent', () => {
  let component: EditarTecnicoComponent;
  let fixture: ComponentFixture<EditarTecnicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarTecnicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarTecnicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
