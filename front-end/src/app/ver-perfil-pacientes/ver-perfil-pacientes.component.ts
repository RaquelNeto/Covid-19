import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {Utilizadorservices} from '../services/utilizadores.service'
import { User } from '../models/users.model';

@Component({
  selector: 'app-ver-perfil-pacientes',
  templateUrl: './ver-perfil-pacientes.component.html',
  styleUrls: ['./ver-perfil-pacientes.component.css']
})
export class VerPerfilPacientesComponent implements OnInit {
user:User
selecteduserId: string;
  constructor(private utilizadorService:Utilizadorservices, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
       this.route.params.subscribe(
      (params: Params) => {
        if (params.id) {
          this.selecteduserId = params.id;
          this.utilizadorService.getUserone(this.selecteduserId).subscribe((user: User) => {
            this.user = user;
          })
        } else {
          this.user = undefined;
        }
      }
    )
  }



}
