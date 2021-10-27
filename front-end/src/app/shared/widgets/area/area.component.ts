import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import {PedidosService} from '../../../services/pedidos.service'

@Component({
  selector: 'app-widget-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})


export class AreaComponent implements OnInit {

numero_de_pessoas_infetadas:number
numero_de_pessoas_naoinfetadas:number
numero_de_pessoas_suspeitas:number



  Highcharts = Highcharts;


  constructor(private pedidosService:PedidosService) { }



  ngOnInit(): void {

this.pedidosService.vernumeroinfetados().subscribe((numero_de_pessoas_infetadas:string)=>{
  this.numero_de_pessoas_infetadas=parseInt(numero_de_pessoas_infetadas);

})

this.pedidosService.vernumeronaoinfetados().subscribe((numero_de_pessoas_naoinfetadas:string)=>{
  this.numero_de_pessoas_naoinfetadas=parseInt(numero_de_pessoas_naoinfetadas);
})

this.pedidosService.vernumerosuspeitos().subscribe((numero_de_pessoas_suspeitos:string)=>{
  this.numero_de_pessoas_suspeitas=parseInt(numero_de_pessoas_suspeitos);
})

    HC_exporting(Highcharts);

    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }

  chartOptions: {};
  @Input() data: any = [{
    name: 'Pessoas Infetadas',
    data: [10, 80, 20, 30]
}, {
    name: 'Não Infetadas',
    data: [10, 90, 65, 30]
}, {
    name: 'Suspeitas',
    data: [10, 90, 80, 70]
}];




}
