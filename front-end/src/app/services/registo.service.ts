import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';


@Injectable({
  providedIn: 'root'
})
export class RegistoService {
constructor(private webReqService: WebRequestService) { }

  createRegisto(nome: string, email: string, data_de_nascimento: string, sexo: string, password: string, numero_utente: string, morada: string, telemovel: number, profissao: string) {
    // We want to send a web request to create a pedido
    return this.webReqService.post('user/registo', {nome, email, data_de_nascimento, sexo, password, numero_utente, morada, telemovel, profissao});
  }
}
