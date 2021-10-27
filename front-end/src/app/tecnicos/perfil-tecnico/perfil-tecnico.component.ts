import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {Utilizadorservices} from '../../services/utilizadores.service'
import { User } from '../../models/users.model';

@Component({
  selector: 'app-perfil-tecnico',
  templateUrl: './perfil-tecnico.component.html',
  styleUrls: ['./perfil-tecnico.component.css']
})
export class PerfilTecnicoComponent implements OnInit {

  user:User


  constructor(private utilizadorService:Utilizadorservices, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
      this.utilizadorService.getUser().subscribe((user: User) => {
            this.user = user;

          })
  }



  editar(): void {
   this.router.navigate(['/editarperfilpaciente'], { relativeTo: this.route });
  }

  retroceder(): void {
    this.router.navigate(["tecnicos"]);
  }

}
