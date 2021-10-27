import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestaoPedidosAceitesComponent } from './gestao-pedidos-aceites.component';

describe('GestaoPedidosAceitesComponent', () => {
  let component: GestaoPedidosAceitesComponent;
  let fixture: ComponentFixture<GestaoPedidosAceitesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestaoPedidosAceitesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestaoPedidosAceitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
