import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class EditarutilizadoresService {

  constructor(private webReqService: WebRequestService) { }

  Editarutilizador(id:String,email: String, morada: String, profissao: String, telemovel: String, role: String, data_de_nascimento: String) {
    // We want to send a web request to create a pedido
    return this.webReqService.put('/admin/update_utilizador/${id}', {email, morada, profissao, telemovel, role, data_de_nascimento });
  }
  Editarutilizadornormal(id:String,email: String, morada: String, profissao: String, telemovel: String, data_de_nascimento: String, passwordnew:String, passwordold:String ) {
    // We want to send a web request to create a pedido
    return this.webReqService.put('user/updateDados', {email, morada, profissao, telemovel, data_de_nascimento, passwordnew, passwordold });
  }


}




