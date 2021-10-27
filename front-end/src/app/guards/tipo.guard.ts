import { SessionService } from '.././services/session.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoGuard implements CanActivate {
  constructor(private router: Router, private sessionService: SessionService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const utilizadorAtual = this.sessionService.valorDoUtilizadorAtual;
    if (utilizadorAtual && utilizadorAtual === route.data.role) {

      //se utilizador existe autoriza
      return true;
    }

    //se nao estiver logado ou não é admin e tentar entrar num link em que nao tenha permissoes redireciona para a página das campanhas
    if(this.sessionService.valorDoUtilizadorAtual === "PACIENTE"){
      this.router.navigate(['/pacientes']);
    }else if(this.sessionService.valorDoUtilizadorAtual === "TECNICO"){
      this.router.navigate(['/tecnicos']);
    }else if(this.sessionService.valorDoUtilizadorAtual === "ADMIN"){
        this.router.navigate(['/dashboard']);
    }
    else if(!this.sessionService.valorDoUtilizadorAtual){
      this.router.navigate(['/login']);
    }

    return false;
  }

}
