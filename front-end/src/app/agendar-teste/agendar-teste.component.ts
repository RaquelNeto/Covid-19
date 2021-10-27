import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {LancarresultadoService} from '../services/lancarresultado.service';
import {PedidosService} from'../services/pedidos.service';
import { Pedidos } from '../models/pedidos.model';

@Component({
  selector: 'app-agendar-teste',
  templateUrl: './agendar-teste.component.html',
  styleUrls: ['./agendar-teste.component.css']
})
export class AgendarTesteComponent implements OnInit {
pedidos:Pedidos
selectedpedidoId:string;

  constructor(private pedidoService:PedidosService,  private lancarresultadoService:LancarresultadoService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  this.route.params.subscribe(
      (params: Params) => {
        if (params.Pedido) {
          this.selectedpedidoId = params.Pedido;

          this.lancarresultadoService.verPedido(params.Pedido).subscribe((pedidos: Pedidos) => {

            this.pedidos = pedidos;
          })
        } else {
          this.pedidos = undefined;
        }
      }
    )
  }

  confirmarAgendamento(datarealizacao:string):void {
   this.pedidoService.aceitarPedido(this.selectedpedidoId,datarealizacao).subscribe((pedido:Pedidos)=>{

   })
   this.router.navigate(['tecnicos']);
  }

  cancelarAgendamento():void {
    this.router.navigate(["tecnicos"]);
  }
}
