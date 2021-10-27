import { Component, OnInit } from '@angular/core';
import { EditarutilizadoresService } from 'src/app/services/editarutilizadores.service';
import { Params,ActivatedRoute, Router } from '@angular/router';
import {User} from '../../models/users.model'


@Component({
  selector: 'app-editarutilizador',
  templateUrl: './editarutilizador.component.html',
  styleUrls: ['./editarutilizador.component.css']
})
export class EditarutilizadorComponent implements OnInit {

  constructor(private editarService: EditarutilizadoresService, private route: ActivatedRoute, private router: Router) { }
  id:string
  email:String
  morada:String
  profissao:String
  telemovel:String
  role:String
  data_de_nascimento:String
  selected = 'TECNICO';

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params.id;
      }
    )
  }

  editarUtilizador(email,morada,profissao,telemovel,role,data_de_nascimento) {
    if( this.email== null || this.data_de_nascimento == null || this.morada == null || this.telemovel == null || this.profissao == null){
      alert("Necessário preencher todos os campos!");
      return;
    }
    this.editarService.Editarutilizador(this.id,email,morada,profissao,telemovel,role,data_de_nascimento).subscribe((atualizar:User)=>{
       this.router.navigate(['/admin'], { relativeTo: this.route });
    })




  }
}
