import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private router: Router, private session: SessionService) { }

  ngOnInit(): void {
  }

  dashboard(): void {
    this.router.navigate(["/dashboard"]);
  }

  meuPerfil(): void {
    this.router.navigate(["/perfiladmin"]);
  }

  gestaoutilizadores(): void {
    this.router.navigate(["/gestaoutilizadores"]);
  }

  gestaoPedidosConcluidos(): void {
    this.router.navigate(['/gestaoPedidoConcluido']);
  }

  logout():void{
    this.session.logout().subscribe();
     this.router.navigate(["/login"]);
  }


}
