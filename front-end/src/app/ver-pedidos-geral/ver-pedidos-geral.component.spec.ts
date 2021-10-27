import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerPedidosGeralComponent } from './ver-pedidos-geral.component';

describe('VerPedidosGeralComponent', () => {
  let component: VerPedidosGeralComponent;
  let fixture: ComponentFixture<VerPedidosGeralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerPedidosGeralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerPedidosGeralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
