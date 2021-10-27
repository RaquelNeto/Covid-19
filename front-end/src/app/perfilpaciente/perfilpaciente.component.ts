import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {Utilizadorservices} from '../services/utilizadores.service'
import { User } from '../models/users.model';

@Component({
  selector: 'app-perfilpaciente',
  templateUrl: './perfilpaciente.component.html',
  styleUrls: ['./perfilpaciente.component.css']
})
export class PerfilpacienteComponent implements OnInit {
user:User
  constructor(private utilizadorService:Utilizadorservices, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
      this.utilizadorService.getUser().subscribe((user: User) => {
            this.user = user;
            console.log(this.user);
          })
  }

  editar(): void {
   this.router.navigate(['/editarutilizador'], { relativeTo: this.route });
  }

  retroceder(): void {
    this.router.navigate(["/pacientes"] , { relativeTo: this.route }) ;
  }

}
