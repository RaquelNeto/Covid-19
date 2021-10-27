import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';


@Injectable({
  providedIn: 'root'
})
export class LancarresultadoService {

  constructor(private webReqService: WebRequestService) { }


verPedido(id:string){
  return this.webReqService.get(`tecnico/lancarPedido/${id}`)
}

 AceitarPedidos(id:string,resultado:String){
    return this.webReqService.post(`tecnico/lancarResultado/${id}`,{resultado});
  }

  verPedidoaceite(id:string){
  return this.webReqService.get(`tecnico/verpedidoaceite/${id}`)
}


}
