import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebartecnicosComponent } from './sidebartecnicos.component';

describe('SidebartecnicosComponent', () => {
  let component: SidebartecnicosComponent;
  let fixture: ComponentFixture<SidebartecnicosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebartecnicosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebartecnicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
