import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class CriarutilizadorService {

constructor(private webReqService: WebRequestService) { }

createUtilizador(nome: string, email: string, data_de_nascimento: string, sexo: string, password: string, numero_utente: string, morada: string, telemovel: number, profissao: string, role:string) {

    return this.webReqService.post('admin/registoutilizador', {nome, email, data_de_nascimento, sexo, password, numero_utente, morada, telemovel, profissao,role});
  }
}




