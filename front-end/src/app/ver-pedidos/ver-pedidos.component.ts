import { Component, OnInit } from '@angular/core';
import {LancarresultadoService  } from '../services/lancarresultado.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {Pedidos} from '../models/pedidos.model'

@Component({
  selector: 'app-ver-pedidos',
  templateUrl: './ver-pedidos.component.html',
  styleUrls: ['./ver-pedidos.component.css']
})
export class VerPedidosComponent implements OnInit {
 pedidos:Pedidos
  selectedpedidoId: string;
  constructor(private lancarresultadoService:LancarresultadoService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        if (params.id) {
          this.selectedpedidoId = params.id;
          this.lancarresultadoService.verPedido(params.id).subscribe((pedidos: Pedidos) => {
            this.pedidos = pedidos;
          })
        } else {
          this.pedidos = undefined;
        }
      }
    )
  }

  agendarRealizacao(): void {
    this.router.navigate([`agendarTeste/${this.selectedpedidoId}`]);
  }

  voltar():void{
     this.router.navigate(["tecncico"]);
  }

}
