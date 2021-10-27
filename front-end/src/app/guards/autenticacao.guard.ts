import { SessionService } from '.././services/session.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoGuard implements CanActivate {
  constructor(private router: Router, private sessionService: SessionService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const utilizadorAtual = this.sessionService.valorDoUtilizadorAtual;

    if (utilizadorAtual) {
      //se utilizador existe autoriza
    return true;
     }

    //se nao estiver logado e tentar entrar num link em que nao tenha permissoes redireciona para a página de login
    this.router.navigate(['/login']);
    return false;
  }


}
