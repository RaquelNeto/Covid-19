import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendarTesteComponent } from './agendar-teste.component';

describe('AgendarTesteComponent', () => {
  let component: AgendarTesteComponent;
  let fixture: ComponentFixture<AgendarTesteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgendarTesteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendarTesteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
