import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router } from '@angular/router';
import {Pedidos} from '../models/pedidos.model'
import {PedidosService} from '../services/pedidos.service'

@Component({
  selector: 'app-tecnicos',
  templateUrl: './tecnicos.component.html',
  styleUrls: ['./tecnicos.component.css']
})
export class TecnicosComponent implements OnInit {
  pedidos:Pedidos;



  sideBarTecnicosOpen = true;

  constructor(private pedidosService: PedidosService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
      this.pedidosService.getPedidos().subscribe((pedidos:Pedidos)=>{
      this.pedidos=pedidos;

     });
  }

  aceitarPedido(id:string){
    this.router.navigate([`agendarTeste/${id}`]);
  }

  recusarPedido(id:string):void{
    this.pedidosService.recusarPedido(id).subscribe((res:any)=>{
      console.log(res);
    this.router.navigate(['tecnicos']);
    })

  }

  verPedido(id:string): void{
    this.router.navigate([`verPedido/${id}`]);
  }

  verPedidoAceite(): void{
    this.router.navigate(['/gestaoPedidoAceites']);
  }

  verPedidoConcluido(): void{
    this.router.navigate(['/gestaoPedidoConcluido']);
  }

}
