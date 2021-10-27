import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarmeuperfilComponent } from './editarmeuperfil.component';

describe('EditarmeuperfilComponent', () => {
  let component: EditarmeuperfilComponent;
  let fixture: ComponentFixture<EditarmeuperfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarmeuperfilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarmeuperfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
