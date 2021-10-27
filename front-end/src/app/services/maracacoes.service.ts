import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';


@Injectable({
  providedIn: 'root'
})
export class MaracacoesService {

constructor(private webReqService: WebRequestService) { }

  createPedido(numero_utente:number,recomendacao: string, grupo_de_risco: string, pq_risco: string) {
    // We want to send a web request to create a pedido
    return this.webReqService.post(`paciente/criarPedido/${numero_utente}`, {recomendacao, grupo_de_risco, pq_risco });
  }
}
