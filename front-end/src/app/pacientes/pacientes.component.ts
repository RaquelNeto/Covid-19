import { Component, OnInit } from '@angular/core';
import {PedidosService } from '../services/pedidos.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {Pedidos} from '../models/pedidos.model'

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent implements OnInit {

  pedidos:Pedidos
  selectedpedidoId: string;
  numero_utente:number
  sideBarOpen = true;

  constructor(private pedidosService:PedidosService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
         this.numero_utente=parseInt(localStorage.getItem("numero_utente"));
        if (this.numero_utente) {

          this.pedidosService.getPedidosconcluidos(this.numero_utente).subscribe((pedidos: Pedidos) => {
            this.pedidos = pedidos;
          })
        } else {
          this.pedidos = undefined;
        }
      }




  downloadPDF():void{
    this.router.navigate(['pacientes']);
  }

}
