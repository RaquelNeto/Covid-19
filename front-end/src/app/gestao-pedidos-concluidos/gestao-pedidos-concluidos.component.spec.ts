import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestaoPedidosConcluidosComponent } from './gestao-pedidos-concluidos.component';

describe('GestaoPedidosConcluidosComponent', () => {
  let component: GestaoPedidosConcluidosComponent;
  let fixture: ComponentFixture<GestaoPedidosConcluidosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestaoPedidosConcluidosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestaoPedidosConcluidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
