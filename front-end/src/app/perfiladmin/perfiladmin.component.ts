import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {Utilizadorservices} from '../services/utilizadores.service'
import { User } from '../models/users.model';

@Component({
  selector: 'app-perfiladmin',
  templateUrl: './perfiladmin.component.html',
  styleUrls: ['./perfiladmin.component.css']
})
export class PerfiladminComponent implements OnInit {
  user:User


  constructor(private utilizadorService:Utilizadorservices, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
      this.utilizadorService.getUser().subscribe((user: User) => {
            this.user = user;
            console.log(this.user);
          })
  }

  uploadFicheiro(): void {

  }

  editar(): void {
   this.router.navigate(['/editarpassword'], { relativeTo: this.route });
  }

  retroceder(): void {
    this.router.navigate(["dashboard"]);
  }
}
