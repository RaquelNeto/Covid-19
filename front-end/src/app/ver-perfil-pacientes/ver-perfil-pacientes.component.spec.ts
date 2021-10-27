import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerPerfilPacientesComponent } from './ver-perfil-pacientes.component';

describe('VerPerfilPacientesComponent', () => {
  let component: VerPerfilPacientesComponent;
  let fixture: ComponentFixture<VerPerfilPacientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerPerfilPacientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerPerfilPacientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
