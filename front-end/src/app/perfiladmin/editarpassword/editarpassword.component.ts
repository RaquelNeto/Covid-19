import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {Utilizadorservices} from '../../services/utilizadores.service'
import { User } from '../../models/users.model';
@Component({
  selector: 'app-editarpassword',
  templateUrl: './editarpassword.component.html',
  styleUrls: ['./editarpassword.component.css']
})
export class EditarpasswordComponent implements OnInit {
  passwordold:string;
  passwordnew:string;
  idutilizador:string;
  numero_utente:Number;
  user:User;

  constructor(private utilizadorService:Utilizadorservices, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
     this.utilizadorService.getUser().subscribe((user: User) => {
            this.user = user;
            this.numero_utente=user.numero_utente;
          })
  }

  editarPass(passwordold:string,passwordnew:string):void{
    if( this.passwordold== null || this.passwordnew == null){
      alert("Necessário preencher a password antiga e introduzir a nova!");
      return;
    }
    this.utilizadorService.editar(this.numero_utente,passwordold,passwordnew).subscribe((user:User)=>{
    this.router.navigate(['/dashboard'], { relativeTo: this.route });
    })
  }

}
