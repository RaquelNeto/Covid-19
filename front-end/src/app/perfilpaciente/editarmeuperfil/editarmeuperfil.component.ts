import { Component, OnInit } from '@angular/core';
import { EditarutilizadoresService } from 'src/app/services/editarutilizadores.service';
import { Params,ActivatedRoute, Router } from '@angular/router';
import {User} from '../../models/users.model'
import { VIRTUAL_SCROLL_STRATEGY } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-editarmeuperfil',
  templateUrl: './editarmeuperfil.component.html',
  styleUrls: ['./editarmeuperfil.component.css']
})
export class EditarmeuperfilComponent implements OnInit {

 constructor(private editarService: EditarutilizadoresService, private route: ActivatedRoute, private router: Router) { }
  id:string
  email:String
  password:String
  morada:String
  profissao:String
  telemovel:String
  role:String
  data_de_nascimento:String
   passwordnew:String
  passwordold:String

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params.id;
      }
    )
  }

  editarUtilizador(email,morada,profissao,telemovel,data_de_nascimento, passwordnew:String,
  passwordold:String) {
     if( this.email== null  || this.morada == null ||this.passwordold == null || this.passwordnew==null || this.profissao == null || this.telemovel == null || this.data_de_nascimento == null ){

      alert("Necessário preencher todos os campos!");
      return;
    }
    this.editarService.Editarutilizadornormal(this.id,email,morada,profissao,telemovel,data_de_nascimento,passwordold,passwordnew).subscribe((atualizar:User)=>{
       this.router.navigate(['/pacientes'], { relativeTo: this.route });
    })





  }
  voltar():void{
     this.router.navigate(['/pacientes'], { relativeTo: this.route });
  }




}
