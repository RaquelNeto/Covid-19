import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarpasswordComponent } from './editarpassword.component';

describe('EditarpasswordComponent', () => {
  let component: EditarpasswordComponent;
  let fixture: ComponentFixture<EditarpasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarpasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
