import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarutilizadorComponent } from './editarutilizador.component';

describe('EditarutilizadorComponent', () => {
  let component: EditarutilizadorComponent;
  let fixture: ComponentFixture<EditarutilizadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarutilizadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarutilizadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
