import { Component, OnInit } from '@angular/core';
import { Pedidos } from '../models/pedidos.model';
import { ActivatedRoute,Router } from '@angular/router';
import {PedidosService} from '../services/pedidos.service'
@Component({
  selector: 'app-gestao-pedidos-concluidos',
  templateUrl: './gestao-pedidos-concluidos.component.html',
  styleUrls: ['./gestao-pedidos-concluidos.component.css']
})
export class GestaoPedidosConcluidosComponent implements OnInit {
  pedidos:Pedidos;

  constructor(private pedidosService: PedidosService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.pedidosService.verPedidosTermindado().subscribe((pedidos:Pedidos)=>{
      this.pedidos=pedidos;

     });
  }


  voltarAtras(): void {
    this.router.navigate(["/tecnicos"]);
  }

}
