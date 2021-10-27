import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {Utilizadorservices} from '../services/utilizadores.service'
import { User } from '../models/users.model';

@Component({
  selector: 'app-ver-pedidos-geral',
  templateUrl: './ver-pedidos-geral.component.html',
  styleUrls: ['./ver-pedidos-geral.component.css']
})
export class VerPedidosGeralComponent implements OnInit {
user:User
  constructor(private utilizadorService:Utilizadorservices, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
      this.utilizadorService.getUsers().subscribe((user: User) => {
            this.user = user;

          })
  }



  voltar():void{
   this.router.navigate(['/tecnicos'], { relativeTo: this.route });
  }





}
