import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';


@Injectable({
  providedIn: 'root'
})
export class Utilizadorservices {

  constructor(private webReqService: WebRequestService) { }


getUser(){
  return this.webReqService.get(`user/perfil`);
}

getUserone(id:string){
  return this.webReqService.get(`user/perfilPaciente/${id}`);
}
getUserbyid(numero_utente:number){
  return this.webReqService.post(`user/verutilizadornumero`,{numero_utente});
}

editar(numero_utente:Number,passwordold:string,passwordnew:string){
  return this.webReqService.put(`user/updatedados`,{numero_utente,passwordold,passwordnew});

}

getUsers(){
  return this.webReqService.get( `user/allusers`);
}

removeUser(id:string){
  return this.webReqService.delete(`admin/eliminarutilizador/${id}`);

}


}
