import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { Pedidos } from '../models/pedidos.model';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  constructor(private webReqService: WebRequestService) { }


  getPedidos(){
    return this.webReqService.get('pedidos/verPedidos');
  }
  getPedidosconcluidos(numero_utente:number){
    return this.webReqService.get(`pedidos/verPedidosconlcuidos/${numero_utente}`);
  }

  aceitarPedido(id:string, datarealizacao:string){
    return this.webReqService.put(`tecnico/aceitarPedido/${id}`,{datarealizacao});

  }

  verPedido(id:string){
  return this.webReqService.get(`tecnico/lancarPedido/${id}`)
}

verPedidosAceites(){
  return this.webReqService.get(`tecnico/pedidosaceites`)
}
verPedidosTermindado(){
  return this.webReqService.get(`tecnico/verPedidosconcluidos`)
}

vernumeroinfetados(){
return this.webReqService.get(`admin/pessoasinfetadas`)
}
vernumeronaoinfetados(){
  return this.webReqService.get(`admin/pessoasnaoinfetadas`)

}

vernumerosuspeitos(){
  return this.webReqService.get(`admin/pessoassuspeitas`)

}



  recusarPedido(id:string){
  return this.webReqService.delete(`tecnico/eliminarPedido/${id}`);
  }


}
