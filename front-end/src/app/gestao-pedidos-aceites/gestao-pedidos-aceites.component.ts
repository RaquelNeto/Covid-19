import { Component, OnInit } from '@angular/core';
import { Pedidos } from '../models/pedidos.model';
import { ActivatedRoute,Router } from '@angular/router';
import {PedidosService} from '../services/pedidos.service'


@Component({
  selector: 'app-gestao-pedidos-aceites',
  templateUrl: './gestao-pedidos-aceites.component.html',
  styleUrls: ['./gestao-pedidos-aceites.component.css']
})
export class GestaoPedidosAceitesComponent implements OnInit {
  pedidos:Pedidos;

  constructor(private pedidosService: PedidosService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.pedidosService.verPedidosAceites().subscribe((pedidos:Pedidos)=>{
      this.pedidos=pedidos;

     });
  }

  lancarResultado(id:string): void {
    this.router.navigate([`lancarResultado/${id}`]);
  }

  voltarAtras(): void {
    this.router.navigate(["/tecnicos"]);
  }

}
