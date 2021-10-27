import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {Utilizadorservices} from '../services/utilizadores.service'
import { User } from '../models/users.model';
@Component({
  selector: 'app-gestaoutilizadores',
  templateUrl: './gestaoutilizadores.component.html',
  styleUrls: ['./gestaoutilizadores.component.css']
})
export class GestaoutilizadoresComponent implements OnInit {
user:User
  constructor(private utilizadorService:Utilizadorservices, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
      this.utilizadorService.getUsers().subscribe((user: User) => {
            this.user = user;
            console.log(this.user);
          })
  }

  voltar(): void{
    this.router.navigate(['/dashboard']);
  }

  editar(id:string):void{
    this.router.navigate(['/editarutilizador'], { relativeTo: this.route });
  }

  remover(id:string):void{
    this.utilizadorService.removeUser(id).subscribe((user:User)=>{
       this.router.navigate(['/gestaoutilizadores'], { relativeTo: this.route });
    })
  }

  findBynumero_utente(numero_utente:number):void{
    this.utilizadorService.getUserbyid(numero_utente).subscribe((user:User)=>{
      this.user=user

    })
  }




}
